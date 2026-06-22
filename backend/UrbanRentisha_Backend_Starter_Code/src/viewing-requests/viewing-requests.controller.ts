import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { CreateViewingRequestDto } from "./dto/create-viewing-request.dto";
import { ViewingRequestsService } from "./viewing-requests.service";

@UseGuards(JwtAuthGuard)
@Controller("viewing-requests")
export class ViewingRequestsController {
  constructor(private readonly viewingRequests: ViewingRequestsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateViewingRequestDto) {
    return this.viewingRequests.create(user.sub, dto);
  }

  @Get()
  findMine(@CurrentUser() user: AuthUser) {
    return this.viewingRequests.findAllForUser(user.sub);
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
