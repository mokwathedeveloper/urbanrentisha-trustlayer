import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotificationType, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";

const ADMIN_ROLES = new Set<UserRole>([UserRole.ADMIN, UserRole.PLATFORM]);

@Injectable()
export class SupportService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeGateway,
  ) {}

  /**
   * One thread per user, ever - get-or-create it on first contact. Any
   * admin/platform user can pick it up; there is no upfront routing.
   */
  async getOrCreateMyThread(userId: string) {
    return this.prisma.supportThread.upsert({
      where: { userId },
      update: {},
      create: { userId },
    });
  }

  private async loadThread(threadId: string) {
    const thread = await this.prisma.supportThread.findUnique({
      where: { id: threadId },
      include: { user: true, assignedAdmin: true },
    });
    if (!thread) throw new NotFoundException("Support conversation not found.");
    return thread;
  }

  private assertParticipant(
    userId: string,
    role: UserRole,
    thread: Awaited<ReturnType<SupportService["loadThread"]>>,
  ) {
    const isRequester = thread.userId === userId;
    const isAdmin = ADMIN_ROLES.has(role);
    if (!isRequester && !isAdmin) {
      throw new ForbiddenException(
        "You do not have access to this conversation.",
      );
    }
    return { isRequester, isAdmin };
  }

  async findMessages(userId: string, role: UserRole, threadId: string) {
    const thread = await this.loadThread(threadId);
    this.assertParticipant(userId, role, thread);

    return this.prisma.message.findMany({
      where: { supportThreadId: threadId },
      orderBy: { createdAt: "asc" },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });
  }

  /**
   * The first admin to reply "claims" the ticket by becoming
   * assignedAdminId - a real assignment, not a cosmetic label, so the
   * requester sees a consistent name across the conversation afterward.
   */
  async sendMessage(
    userId: string,
    role: UserRole,
    threadId: string,
    body: string,
  ) {
    const thread = await this.loadThread(threadId);
    const { isAdmin } = this.assertParticipant(userId, role, thread);

    const message = await this.prisma.message.create({
      data: { supportThreadId: threadId, senderId: userId, body },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });

    if (isAdmin && !thread.assignedAdminId) {
      await this.prisma.supportThread.update({
        where: { id: threadId },
        data: { assignedAdminId: userId },
      });
    }

    if (isAdmin) {
      await this.notifications.create({
        userId: thread.userId,
        type: NotificationType.SYSTEM,
        title: "New Message",
        message: `${message.sender.name} from UrbanRentisha Support sent you a message.`,
      });
      this.realtime.emitToUser(thread.userId, "message:new", {
        threadId,
        kind: "support",
      });
    } else {
      await this.notifications.notifyAdmins({
        type: NotificationType.SYSTEM,
        title: "New Message",
        message: `${message.sender.name} needs help in support chat.`,
      });
      const admins = await this.prisma.user.findMany({
        where: { role: { in: [UserRole.ADMIN, UserRole.PLATFORM] } },
        select: { id: true },
      });
      admins.forEach((admin) =>
        this.realtime.emitToUser(admin.id, "message:new", {
          threadId,
          kind: "support",
        }),
      );
    }

    return message;
  }

  async markRead(userId: string, role: UserRole, threadId: string) {
    const thread = await this.loadThread(threadId);
    this.assertParticipant(userId, role, thread);

    const unread = await this.prisma.message.findMany({
      where: {
        supportThreadId: threadId,
        senderId: { not: userId },
        readAt: null,
      },
      select: { senderId: true },
    });
    if (unread.length === 0) return { updated: 0 };

    const readAt = new Date();
    await this.prisma.message.updateMany({
      where: {
        supportThreadId: threadId,
        senderId: { not: userId },
        readAt: null,
      },
      data: { readAt },
    });

    const senderIds = [...new Set(unread.map((m) => m.senderId))];
    senderIds.forEach((senderId) =>
      this.realtime.emitToUser(senderId, "message:read", {
        threadId,
        readAt: readAt.toISOString(),
      }),
    );

    return { updated: unread.length };
  }
}
