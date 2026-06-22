import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotificationType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@Injectable()
export class MessagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
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
    owner: { id: string; name: string };
    agent: { user: { id: string; name: string } } | null;
    manager: { user: { id: string; name: string } } | null;
  }) {
    const contacts = [
      { id: listing.owner.id, name: listing.owner.name },
      listing.agent
        ? { id: listing.agent.user.id, name: listing.agent.user.name }
        : null,
      listing.manager
        ? { id: listing.manager.user.id, name: listing.manager.user.name }
        : null,
    ].filter(
      (contact): contact is { id: string; name: string } => contact !== null,
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

    await Promise.all(
      recipientIds
        .filter((recipientId) => recipientId !== senderId)
        .map((recipientId) =>
          this.notifications.create({
            userId: recipientId,
            type: NotificationType.SYSTEM,
            title: "New Message",
            message: `${message.sender.name} sent you a message about ${request.listing.title}.`,
            viewingRequestId,
          }),
        ),
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

  async findInbox(userId: string) {
    const [viewingRequestThreads, listingThreads] = await Promise.all([
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
    ]);

    const fromViewingRequests = viewingRequestThreads.map((thread) => {
      const isTenantViewer = thread.tenant.user.id === userId;
      const contacts = this.listingContacts(thread.listing);
      return {
        kind: "viewing_request" as const,
        id: thread.id,
        listingTitle: thread.listing.title,
        otherParty: isTenantViewer
          ? (contacts.find((contact) => contact.id !== userId)?.name ??
            "Listing Contact")
          : thread.tenant.user.name,
        lastMessage: thread.messages[0]?.body ?? "",
        lastMessageAt: thread.messages[0]?.createdAt ?? thread.updatedAt,
      };
    });

    const fromListingThreads = listingThreads.map((thread) => {
      const isTenantViewer = thread.tenant.id === userId;
      const contacts = this.listingContacts(thread.listing);
      return {
        kind: "listing_thread" as const,
        id: thread.id,
        listingTitle: thread.listing.title,
        otherParty: isTenantViewer
          ? (contacts.find((contact) => contact.id !== userId)?.name ??
            "Listing Contact")
          : thread.tenant.name,
        lastMessage: thread.messages[0]?.body ?? "",
        lastMessageAt: thread.messages[0]?.createdAt ?? thread.createdAt,
      };
    });

    return [...fromViewingRequests, ...fromListingThreads].sort(
      (a, b) =>
        new Date(b.lastMessageAt).getTime() -
        new Date(a.lastMessageAt).getTime(),
    );
  }
}
