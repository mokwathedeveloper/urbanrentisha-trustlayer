import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { AgentsService } from "./agents.service";

@UseGuards(JwtAuthGuard)
@Controller("agents")
export class AgentsController {
  constructor(private readonly agents: AgentsService) {}

  @Get("me/dashboard")
  findMyDashboard(@CurrentUser() user: AuthUser) {
    return this.agents.findMyDashboard(user.sub, user.role);
  }

  @Get("me/escrow")
  findMyEscrowOverview(@CurrentUser() user: AuthUser) {
    return this.agents.findEscrowOverview(user.sub, user.role);
  }

  @Get("me/escrow/summary")
  findMyEscrowSummary(@CurrentUser() user: AuthUser) {
    return this.agents.findEscrowSummary(user.sub, user.role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.agents.findOne(id);
  }
}
