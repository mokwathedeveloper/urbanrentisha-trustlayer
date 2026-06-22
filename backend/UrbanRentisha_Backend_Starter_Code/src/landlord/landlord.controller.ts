import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { LandlordService } from "./landlord.service";
import { InviteAgentDto } from "./dto/invite-agent.dto";

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.LANDLORD, UserRole.ADMIN, UserRole.PLATFORM)
@Controller("landlord")
export class LandlordController {
  constructor(private readonly landlord: LandlordService) {}

  @Post("agents")
  inviteAgent(@CurrentUser() user: AuthUser, @Body() dto: InviteAgentDto) {
    return this.landlord.inviteAgent(user.sub, user.role, dto);
  }

  @Get("team")
  getTeam(@CurrentUser() user: AuthUser) {
    return this.landlord.getTeam(user.sub, user.role);
  }
}
