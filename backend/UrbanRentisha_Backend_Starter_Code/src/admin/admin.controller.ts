import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { AdminService } from "./admin.service";
import { ReviewVerificationDto } from "./dto/review-verification.dto";

enum ProfileTypeParam {
  tenant = "tenant",
  landlord = "landlord",
  agent = "agent",
  manager = "manager",
}

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller("admin")
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get("dashboard")
  dashboard() {
    return this.admin.dashboard();
  }

  @Get("overview")
  overview() {
    return this.admin.overview();
  }

  @Get("verifications")
  listVerifications() {
    return this.admin.listVerifications();
  }

  @Patch("verifications/:profileType/:profileId/review")
  reviewVerification(
    @Param("profileType", new ParseEnumPipe(ProfileTypeParam))
    profileType: ProfileTypeParam,
    @Param("profileId") profileId: string,
    @Body() dto: ReviewVerificationDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.admin.reviewVerification(
      profileType,
      profileId,
      dto.decision,
      dto.note,
      user.sub,
    );
  }
}
