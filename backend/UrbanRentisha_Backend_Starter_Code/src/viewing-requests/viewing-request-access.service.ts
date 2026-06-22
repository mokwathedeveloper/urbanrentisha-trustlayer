import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

const ADMIN_ROLES = new Set<UserRole>([UserRole.ADMIN, UserRole.PLATFORM]);

/**
 * Shared ownership check for any module that acts on a ViewingRequest
 * (payments, zk-proofs, proof-verification, viewing-codes). A caller may
 * access a viewing request only if they are the tenant who created it, the
 * landlord/agent/manager tied to the listing, or an admin.
 */
@Injectable()
export class ViewingRequestAccessService {
  constructor(private readonly prisma: PrismaService) {}

  async assertAccess(viewingRequestId: string, userId: string, role: UserRole) {
    const request = await this.prisma.viewingRequest.findUnique({
      where: { id: viewingRequestId },
      include: {
        tenant: { select: { userId: true } },
        listing: {
          select: {
            ownerId: true,
            agent: { select: { userId: true } },
            manager: { select: { userId: true } },
          },
        },
      },
    });

    if (!request) throw new NotFoundException("Viewing request not found.");

    if (ADMIN_ROLES.has(role)) return request;

    const isTenant = request.tenant.userId === userId;
    const isOwner = request.listing.ownerId === userId;
    const isAgent = request.listing.agent?.userId === userId;
    const isManager = request.listing.manager?.userId === userId;

    if (!isTenant && !isOwner && !isAgent && !isManager) {
      throw new ForbiddenException(
        "You do not have access to this viewing request.",
      );
    }

    return request;
  }
}
