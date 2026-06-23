import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotificationType, UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { RealtimeGateway } from "../realtime/realtime.gateway";
import { CreateMessageDto } from "./dto/create-message.dto";

const ADMIN_ROLES = new Set<UserRole>([UserRole.ADMIN, UserRole.PLATFORM]);

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly realtime: RealtimeGateway,
  ) {}

  private async loadThread(viewingRequestId: string) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: viewingRequestId },
      include: {
        listing: {
          include: {
            agent: { include: { user: true } },
            manager: { include: { user: true } },
            owner: true,
          },
        },
        tenant: { include: { user: true } },
      },
    });
    if (!request) throw new NotFoundException("Viewing request not found.");
    return request;
  }

  private assertParticipant(
    userId: string,
    request: Awaited<ReturnType<MessagesService["loadThread"]>>,
  ) {
    const isTenant = request.tenant.user.id === userId;
    const isOwner = request.listing.owner.id === userId;
    const isAgent = request.listing.agent?.user.id === userId;
    const isManager = request.listing.manager?.user.id === userId;
    if (!isTenant && !isOwner && !isAgent && !isManager) {
      throw new ForbiddenException(
        "You do not have access to this conversation.",
      );
    }
    return { isTenant, isOwner, isAgent, isManager };
  }

  private listingContacts(listing: {
    owner: { id: string; name: string; lastActiveAt: Date | null };
    agent: {
      user: { id: string; name: string; lastActiveAt: Date | null };
    } | null;
    manager: {
      user: { id: string; name: string; lastActiveAt: Date | null };
    } | null;
  }) {
    const contacts = [
      {
        id: listing.owner.id,
        name: listing.owner.name,
        lastActiveAt: listing.owner.lastActiveAt,
      },
      listing.agent
        ? {
            id: listing.agent.user.id,
            name: listing.agent.user.name,
            lastActiveAt: listing.agent.user.lastActiveAt,
          }
        : null,
      listing.manager
        ? {
            id: listing.manager.user.id,
            name: listing.manager.user.name,
            lastActiveAt: listing.manager.user.lastActiveAt,
          }
        : null,
    ].filter(
      (
        contact,
      ): contact is { id: string; name: string; lastActiveAt: Date | null } =>
        contact !== null,
    );

    const seen = new Set<string>();
    return contacts.filter((contact) => {
      if (seen.has(contact.id)) return false;
      seen.add(contact.id);
      return true;
    });
  }

  async create(
    senderId: string,
    viewingRequestId: string,
    dto: CreateMessageDto,
  ) {
    const request = await this.loadThread(viewingRequestId);
    const { isTenant } = this.assertParticipant(senderId, request);

    const message = await this.prisma.message.create({
      data: { viewingRequestId, senderId, body: dto.body },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });

    const recipientIds = isTenant
      ? this.listingContacts(request.listing).map((contact) => contact.id)
      : [request.tenant.user.id];

    const recipients = recipientIds.filter(
      (recipientId) => recipientId !== senderId,
    );

    await Promise.all(
      recipients.map((recipientId) =>
        this.notifications.create({
          userId: recipientId,
          type: NotificationType.SYSTEM,
          title: "New Message",
          message: `${message.sender.name} sent you a message about ${request.listing.title}.`,
          viewingRequestId,
        }),
      ),
    );

    recipients.forEach((recipientId) =>
      this.realtime.emitToUser(recipientId, "message:new", {
        threadId: viewingRequestId,
        kind: "viewing_request",
      }),
    );

    return message;
  }

  async findForRequest(userId: string, viewingRequestId: string) {
    const request = await this.loadThread(viewingRequestId);
    this.assertParticipant(userId, request);

    return this.prisma.message.findMany({
      where: { viewingRequestId },
      orderBy: { createdAt: "asc" },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });
  }

  /**
   * Marks every message in this thread sent by the other party as read.
   * Pushes a `message:read` receipt to each of those senders so their open
   * conversation view updates instantly, without them needing to poll.
   */
  async markRequestThreadRead(userId: string, viewingRequestId: string) {
    const request = await this.loadThread(viewingRequestId);
    this.assertParticipant(userId, request);

    const unread = await this.prisma.message.findMany({
      where: { viewingRequestId, senderId: { not: userId }, readAt: null },
      select: { senderId: true },
    });
    if (unread.length === 0) return { updated: 0 };

    const readAt = new Date();
    await this.prisma.message.updateMany({
      where: { viewingRequestId, senderId: { not: userId }, readAt: null },
      data: { readAt },
    });

    const senderIds = [...new Set(unread.map((m) => m.senderId))];
    senderIds.forEach((senderId) =>
      this.realtime.emitToUser(senderId, "message:read", {
        threadId: viewingRequestId,
        readAt: readAt.toISOString(),
      }),
    );

    return { updated: unread.length };
  }

  async findInbox(userId: string, role: UserRole) {
    const [viewingRequestThreads, listingThreads, supportThreads] =
      await Promise.all([
        this.prisma.viewingRequest.findMany({
          where: {
            messages: { some: {} },
            OR: [
              { tenant: { userId } },
              { listing: { ownerId: userId } },
              { listing: { agent: { userId } } },
              { listing: { manager: { userId } } },
            ],
          },
          include: {
            listing: {
              include: {
                agent: { include: { user: true } },
                manager: { include: { user: true } },
                owner: true,
              },
            },
            tenant: { include: { user: true } },
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
              include: { sender: { select: { name: true } } },
            },
          },
        }),
        this.prisma.listingThread.findMany({
          where: {
            messages: { some: {} },
            OR: [
              { tenantId: userId },
              { listing: { ownerId: userId } },
              { listing: { agent: { userId } } },
              { listing: { manager: { userId } } },
            ],
          },
          include: {
            listing: {
              include: {
                agent: { include: { user: true } },
                manager: { include: { user: true } },
                owner: true,
              },
            },
            tenant: true,
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
              include: { sender: { select: { name: true } } },
            },
          },
        }),
        this.prisma.supportThread.findMany({
          where: {
            messages: { some: {} },
            ...(ADMIN_ROLES.has(role) ? {} : { userId }),
          },
          include: {
            user: true,
            assignedAdmin: true,
            messages: {
              orderBy: { createdAt: "desc" },
              take: 1,
              include: { sender: { select: { name: true } } },
            },
          },
        }),
      ]);

    const [unreadByRequest, unreadByListingThread, unreadBySupportThread] =
      await Promise.all([
        this.prisma.message.groupBy({
          by: ["viewingRequestId"],
          where: {
            viewingRequestId: { in: viewingRequestThreads.map((t) => t.id) },
            senderId: { not: userId },
            readAt: null,
          },
          _count: { _all: true },
        }),
        this.prisma.message.groupBy({
          by: ["listingThreadId"],
          where: {
            listingThreadId: { in: listingThreads.map((t) => t.id) },
            senderId: { not: userId },
            readAt: null,
          },
          _count: { _all: true },
        }),
        this.prisma.message.groupBy({
          by: ["supportThreadId"],
          where: {
            supportThreadId: { in: supportThreads.map((t) => t.id) },
            senderId: { not: userId },
            readAt: null,
          },
          _count: { _all: true },
        }),
      ]);
    const unreadRequestMap = new Map(
      unreadByRequest.map((row) => [row.viewingRequestId, row._count._all]),
    );
    const unreadListingThreadMap = new Map(
      unreadByListingThread.map((row) => [
        row.listingThreadId,
        row._count._all,
      ]),
    );
    const unreadSupportThreadMap = new Map(
      unreadBySupportThread.map((row) => [
        row.supportThreadId,
        row._count._all,
      ]),
    );

    const fromViewingRequests = viewingRequestThreads.map((thread) => {
      const isTenantViewer = thread.tenant.user.id === userId;
      const contacts = this.listingContacts(thread.listing);
      const otherContact = isTenantViewer
        ? contacts.find((contact) => contact.id !== userId)
        : null;
      return {
        kind: "viewing_request" as const,
        id: thread.id,
        listingId: thread.listing.id,
        listingTitle: thread.listing.title,
        listingImageUrl: thread.listing.imageUrl,
        otherParty: otherContact?.name ?? thread.tenant.user.name,
        otherPartyId: otherContact?.id ?? thread.tenant.user.id,
        otherPartyLastActiveAt:
          (
            otherContact?.lastActiveAt ?? thread.tenant.user.lastActiveAt
          )?.toISOString() ?? null,
        lastMessage: thread.messages[0]?.body ?? "",
        lastMessageAt: thread.messages[0]?.createdAt ?? thread.updatedAt,
        unreadCount: unreadRequestMap.get(thread.id) ?? 0,
      };
    });

    const fromListingThreads = listingThreads.map((thread) => {
      const isTenantViewer = thread.tenant.id === userId;
      const contacts = this.listingContacts(thread.listing);
      const otherContact = isTenantViewer
        ? contacts.find((contact) => contact.id !== userId)
        : null;
      return {
        kind: "listing_thread" as const,
        id: thread.id,
        listingId: thread.listing.id,
        listingTitle: thread.listing.title,
        listingImageUrl: thread.listing.imageUrl,
        otherParty: otherContact?.name ?? thread.tenant.name,
        otherPartyId: otherContact?.id ?? thread.tenant.id,
        otherPartyLastActiveAt:
          (
            otherContact?.lastActiveAt ?? thread.tenant.lastActiveAt
          )?.toISOString() ?? null,
        lastMessage: thread.messages[0]?.body ?? "",
        lastMessageAt: thread.messages[0]?.createdAt ?? thread.createdAt,
        unreadCount: unreadListingThreadMap.get(thread.id) ?? 0,
      };
    });

    const fromSupportThreads = supportThreads.map((thread) => {
      const isRequester = thread.userId === userId;
      const otherParty = isRequester
        ? (thread.assignedAdmin?.name ?? "UrbanRentisha Support")
        : thread.user.name;
      const otherPartyId = isRequester
        ? (thread.assignedAdminId ?? "")
        : thread.userId;
      const otherPartyLastActiveAt = isRequester
        ? (thread.assignedAdmin?.lastActiveAt?.toISOString() ?? null)
        : (thread.user.lastActiveAt?.toISOString() ?? null);
      return {
        kind: "support" as const,
        id: thread.id,
        listingId: null,
        listingTitle: "Support",
        listingImageUrl: null,
        otherParty,
        otherPartyId,
        otherPartyLastActiveAt,
        lastMessage: thread.messages[0]?.body ?? "",
        lastMessageAt: thread.messages[0]?.createdAt ?? thread.createdAt,
        unreadCount: unreadSupportThreadMap.get(thread.id) ?? 0,
      };
    });

    return [
      ...fromViewingRequests,
      ...fromListingThreads,
      ...fromSupportThreads,
    ].sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime(),
    );
  }
}
