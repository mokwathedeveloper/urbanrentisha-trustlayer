import { ForbiddenException, Injectable } from "@nestjs/common";
import { NotificationType, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(input: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    viewingRequestId?: string;
    listingId?: string;
  }) {
    return this.prisma.notification.create({ data: input });
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

  findForUser(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
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
    });
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
