import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { AdminDashboardService } from "./admin-dashboard.service";
import { AdminVerificationService } from "./admin-verification.service";
import { AdminUserService } from "./admin-user.service";
import { AdminLandlordService } from "./admin-landlord.service";
import { AdminPaymentOpsService } from "./admin-payment-ops.service";
import { ReviewVerificationDto } from "./dto/review-verification.dto";
import { UpdateUserStatusDto } from "./dto/update-user-status.dto";
import { SetAgentLandlordDto } from "./dto/set-agent-landlord.dto";

enum ProfileTypeParam {
  tenant = "tenant",
  landlord = "landlord",
  agent = "agent",
  manager = "manager",
}

enum AgentLikeProfileTypeParam {
  agent = "agent",
  manager = "manager",
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("admin")
export class AdminController {
  constructor(
    private readonly dashboardService: AdminDashboardService,
    private readonly verification: AdminVerificationService,
    private readonly users: AdminUserService,
    private readonly landlords: AdminLandlordService,
    private readonly paymentOps: AdminPaymentOpsService,
  ) {}

  @Get("dashboard")
  dashboard() {
    return this.dashboardService.dashboard();
  }

  @Get("overview")
  overview() {
    return this.dashboardService.overview();
  }

  @Get("verifications")
  listVerifications() {
    return this.verification.listVerifications();
  }

  @Patch("verifications/:profileType/:profileId/review")
  reviewVerification(
    @Param("profileType", new ParseEnumPipe(ProfileTypeParam))
    profileType: ProfileTypeParam,
    @Param("profileId") profileId: string,
    @Body() dto: ReviewVerificationDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.verification.reviewVerification(
      profileType,
      profileId,
      dto.decision,
      dto.note,
      user.sub,
    );
  }

  @Patch("users/:id/status")
  setUserStatus(
    @Param("id") id: string,
    @Body() dto: UpdateUserStatusDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.users.setUserStatus(id, dto.status, user.sub);
  }

  @Get("landlords")
  listLandlords() {
    return this.landlords.listLandlords();
  }

  @Patch("agents/:profileType/:profileId/landlord")
  setAgentLandlord(
    @Param("profileType", new ParseEnumPipe(AgentLikeProfileTypeParam))
    profileType: AgentLikeProfileTypeParam,
    @Param("profileId") profileId: string,
    @Body() dto: SetAgentLandlordDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.landlords.setAgentLandlord(
      profileType,
      profileId,
      dto.landlordProfileId ?? null,
      user.sub,
    );
  }

  @Get("landlords/:landlordProfileId/team")
  getLandlordTeam(@Param("landlordProfileId") landlordProfileId: string) {
    return this.landlords.getLandlordTeam(landlordProfileId);
  }

  @Post("payments/:id/refund")
  refundPayment(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.paymentOps.refundPayment(id, user.sub);
  }
}
