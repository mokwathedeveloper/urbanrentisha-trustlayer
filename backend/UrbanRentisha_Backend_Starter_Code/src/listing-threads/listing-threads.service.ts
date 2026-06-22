import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { NotificationType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { NotificationsService } from "../notifications/notifications.service";

const LISTING_THREAD_PARTIES_INCLUDE = {
  agent: { include: { user: true } },
  manager: { include: { user: true } },
  owner: true,
} as const;

@Injectable()
export class ListingThreadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  /**
   * Lets a tenant message a listing's poster (owner/agent/manager) before
   * any viewing request exists - get-or-create their one thread for this
   * listing, mirroring how a viewing request's chat works but reachable
   * straight from the listing page.
   */
  async getOrCreate(tenantId: string, listingId: string) {
    const listing = await this.prisma.listing.findUnique({
      where: { id: listingId },
    });
    if (!listing) throw new NotFoundException("Listing not found.");

    const thread = await this.prisma.listingThread.upsert({
      where: { listingId_tenantId: { listingId, tenantId } },
      update: {},
      create: { listingId, tenantId },
    });

    return thread;
  }

  private async loadThread(threadId: string) {
    const thread = await this.prisma.listingThread.findUnique({
      where: { id: threadId },
      include: {
        listing: { include: LISTING_THREAD_PARTIES_INCLUDE },
        tenant: true,
      },
    });
    if (!thread) throw new NotFoundException("Conversation not found.");
    return thread;
  }

  private assertParticipant(
    userId: string,
    thread: Awaited<ReturnType<ListingThreadsService["loadThread"]>>,
  ) {
    const isTenant = thread.tenant.id === userId;
    const isOwner = thread.listing.owner.id === userId;
    const isAgent = thread.listing.agent?.user.id === userId;
    const isManager = thread.listing.manager?.user.id === userId;
    if (!isTenant && !isOwner && !isAgent && !isManager) {
      throw new ForbiddenException(
        "You do not have access to this conversation.",
      );
    }
    return { isTenant, isOwner, isAgent, isManager };
  }

  private listingContacts(
    listing: Awaited<
      ReturnType<ListingThreadsService["loadThread"]>
    >["listing"],
  ) {
    const contacts = [
      { id: listing.owner.id, name: listing.owner.name },
      listing.agent
        ? { id: listing.agent.user.id, name: listing.agent.user.name }
        : null,
      listing.manager
        ? { id: listing.manager.user.id, name: listing.manager.user.name }
        : null,
    ].filter((c): c is { id: string; name: string } => c !== null);

    const seen = new Set<string>();
    return contacts.filter((c) => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  }

  async findMessages(userId: string, threadId: string) {
    const thread = await this.loadThread(threadId);
    this.assertParticipant(userId, thread);

    return this.prisma.message.findMany({
      where: { listingThreadId: threadId },
      orderBy: { createdAt: "asc" },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });
  }

  async sendMessage(userId: string, threadId: string, body: string) {
    const thread = await this.loadThread(threadId);
    const { isTenant } = this.assertParticipant(userId, thread);

    const message = await this.prisma.message.create({
      data: { listingThreadId: threadId, senderId: userId, body },
      include: { sender: { select: { id: true, name: true, role: true } } },
    });

    const recipientIds = isTenant
      ? this.listingContacts(thread.listing).map((c) => c.id)
      : [thread.tenant.id];

    await Promise.all(
      recipientIds
        .filter((recipientId) => recipientId !== userId)
        .map((recipientId) =>
          this.notifications.create({
            userId: recipientId,
            type: NotificationType.SYSTEM,
            title: "New Message",
            message: `${message.sender.name} sent you a message about ${thread.listing.title}.`,
            listingId: thread.listingId,
          }),
        ),
    );

    return message;
  }
}
