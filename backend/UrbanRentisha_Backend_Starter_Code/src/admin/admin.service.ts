import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async dashboard() {
    const [
      users,
      listings,
      viewingRequests,
      reports,
      proofVerifications,
      auditLogs
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.listing.count(),
      this.prisma.viewingRequest.count(),
      this.prisma.report.count(),
      this.prisma.proofVerification.count(),
      this.prisma.auditLog.count()
    ]);

    return {
      users,
      listings,
      viewingRequests,
      reports,
      proofVerifications,
      auditLogs
    };
  }
}
