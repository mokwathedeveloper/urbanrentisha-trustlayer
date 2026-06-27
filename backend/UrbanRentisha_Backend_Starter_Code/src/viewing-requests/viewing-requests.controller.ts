import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { FINANCIAL_MUTATION_THROTTLE } from "../common/constants/throttle-limits";
import { CreateViewingRequestDto } from "./dto/create-viewing-request.dto";
import { ViewingRequestsService } from "./viewing-requests.service";

@UseGuards(JwtAuthGuard)
@Controller("viewing-requests")
export class ViewingRequestsController {
  constructor(private readonly viewingRequests: ViewingRequestsService) {}

  // Claims a queue slot / triggers reservation-adjacent state transitions -
  // same mutation tier as the payment/escrow endpoints it feeds into.
  @Throttle(FINANCIAL_MUTATION_THROTTLE)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateViewingRequestDto) {
    return this.viewingRequests.create(user.sub, dto);
  }

  @Get()
  findMine(@CurrentUser() user: AuthUser) {
    return this.viewingRequests.findAllForUser(user.sub);
  }

  @Get("escrow-summary")
  findEscrowSummary(@CurrentUser() user: AuthUser) {
    return this.viewingRequests.findEscrowSummary(user.sub);
  }

  @Get(":id")
  findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.viewingRequests.findOne(id, user.sub, user.role);
  }

  @Get(":id/status")
  status(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.viewingRequests.status(id, user.sub, user.role);
  }
}
