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
        listing: { include: { agent: { include: { user: true } } } },
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
    const isAgent = request.listing.agent?.user.id === userId;
    if (!isTenant && !isAgent) {
      throw new ForbiddenException(
        "You do not have access to this conversation.",
      );
    }
    return { isTenant, isAgent };
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

    const recipientId = isTenant
      ? request.listing.agent?.user.id
      : request.tenant.user.id;
    if (recipientId) {
      await this.notifications.create({
        userId: recipientId,
        type: NotificationType.SYSTEM,
        title: "New Message",
        message: `${message.sender.name} sent you a message about ${request.listing.title}.`,
        viewingRequestId,
      });
    }

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
    const threads = await this.prisma.viewingRequest.findMany({
      where: {
        messages: { some: {} },
        OR: [{ tenant: { userId } }, { listing: { agent: { userId } } }],
      },
      include: {
        listing: { include: { agent: { include: { user: true } } } },
        tenant: { include: { user: true } },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: { sender: { select: { name: true } } },
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return threads.map((thread) => ({
      viewingRequestId: thread.id,
      listingTitle: thread.listing.title,
      otherParty:
        thread.tenant.user.id === userId
          ? (thread.listing.agent?.user.name ?? "Agent")
          : thread.tenant.user.name,
      lastMessage: thread.messages[0]?.body ?? "",
      lastMessageAt: thread.messages[0]?.createdAt ?? thread.updatedAt,
    }));
  }
}
