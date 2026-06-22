import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuditLogsService } from "../audit-logs/audit-logs.service";
import { CreateReviewDto } from "./dto/create-review.dto";

@Injectable()
export class ReviewsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditLogs: AuditLogsService,
  ) {}

  async create(reviewerId: string, targetUserId: string, dto: CreateReviewDto) {
    if (reviewerId === targetUserId) {
      throw new BadRequestException("You cannot review yourself.");
    }

    const target = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        agentProfile: true,
        landlordProfile: true,
        managerProfile: true,
      },
    });
    if (!target) throw new NotFoundException("User not found.");
    if (
      !target.agentProfile &&
      !target.landlordProfile &&
      !target.managerProfile
    ) {
      throw new BadRequestException(
        "Only agents, landlords, and managers can be reviewed.",
      );
    }

    const review = await this.prisma.review.upsert({
      where: { reviewerId_targetUserId: { reviewerId, targetUserId } },
      update: {
        rating: dto.rating,
        comment: dto.comment,
        listingId: dto.listingId,
      },
      create: {
        reviewerId,
        targetUserId,
        rating: dto.rating,
        comment: dto.comment,
        listingId: dto.listingId,
      },
      include: { reviewer: { select: { id: true, name: true } } },
    });

    await this.auditLogs.create({
      actorId: reviewerId,
      action: "review.submitted",
      entityType: "review",
      entityId: review.id,
      severity: "INFO",
      metadata: { targetUserId, rating: dto.rating },
    });

    return review;
  }

  async findForUser(targetUserId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { targetUserId },
      orderBy: { createdAt: "desc" },
      include: { reviewer: { select: { id: true, name: true } } },
    });

    const count = reviews.length;
    const average =
      count === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / count;

    return { reviews, average: Math.round(average * 10) / 10, count };
  }

  /** Used by the reviews controller to reject non-tenant authors up front. */
  assertCanReview(role: UserRole) {
    if (role !== UserRole.TENANT) {
      throw new BadRequestException("Only tenants can leave reviews.");
    }
  }
}
