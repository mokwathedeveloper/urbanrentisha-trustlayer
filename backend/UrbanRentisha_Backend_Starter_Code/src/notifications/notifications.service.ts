import { ForbiddenException, Injectable } from "@nestjs/common";
import { NotificationType, Prisma, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { PaginationQueryDto } from "../common/dto/pagination-query.dto";
import {
  buildPaginatedResult,
  paginationArgs,
} from "../common/utils/pagination.util";

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly realtime: RealtimeGateway,
  ) {}

  /**
   * Pure database write, no realtime emit - for callers running inside a
   * Prisma transaction, where no side effect may execute before COMMIT.
   * Pass the returned row to `emitCreated` once the transaction has
   * actually committed.
   */
  createRecord(
    input: {
      userId: string;
      type: NotificationType;
      title: string;
      message: string;
      viewingRequestId?: string;
      listingId?: string;
    },
    client: PrismaService | Prisma.TransactionClient = this.prisma,
  ) {
    return client.notification.create({ data: input });
  }

  /**
   * Default, non-transactional path: write the row, then emit immediately.
   * Safe for any caller not wrapping this in a transaction.
   */
  async create(
    input: {
      userId: string;
      type: NotificationType;
      title: string;
      message: string;
      viewingRequestId?: string;
      listingId?: string;
    },
    client: PrismaService | Prisma.TransactionClient = this.prisma,
  ) {
    const notification = await this.createRecord(input, client);
    this.emitCreated(notification);
    return notification;
  }

  /** Fires the realtime emit for a notification row that was already
   * written (typically via `createRecord` inside a now-committed
   * transaction). */
  emitCreated(notification: { userId: string }) {
    this.realtime.emitToUser(
      notification.userId,
      "notification:new",
      notification,
    );
  }

  async notifyAdmins(input: {
    type: NotificationType;
    title: string;
    message: string;
    viewingRequestId?: string;
    listingId?: string;
  }) {
    const admins = await this.prisma.user.findMany({
      where: { role: { in: [UserRole.ADMIN, UserRole.PLATFORM] } },
      select: { id: true },
    });

    await Promise.all(
      admins.map((admin) => this.create({ ...input, userId: admin.id })),
    );
  }

  /** Paginated (page/limit, default 20, hard max 100) - previously
   * unbounded, with a heavy nested include per row. */
  async findForUser(userId: string, pagination: PaginationQueryDto) {
    const { page, limit } = pagination;
    const where = { userId };

    const [items, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        include: {
          viewingRequest: {
            include: {
              listing: true,
              payment: true,
              zkProof: true,
              proofVerification: true,
              viewingCode: true,
            },
          },
          listing: true,
        },
        ...paginationArgs(page, limit),
      }),
      this.prisma.notification.count({ where }),
    ]);

    return buildPaginatedResult(items, total, page, limit);
  }

  async markRead(id: string, userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { id, userId },
      data: { readAt: new Date() },
    });
    if (result.count === 0) {
      throw new ForbiddenException(
        "You do not have access to this notification.",
      );
    }
    return this.prisma.notification.findUnique({ where: { id } });
  }
}
