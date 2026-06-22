import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { UserRole } from "@prisma/client";
import { CreateMessageDto } from "../messages/dto/create-message.dto";
import { ListingThreadsService } from "./listing-threads.service";

@UseGuards(JwtAuthGuard)
@Controller("listings/:id/thread")
export class ListingThreadsController {
  constructor(private readonly listingThreads: ListingThreadsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.TENANT)
  @Post()
  getOrCreate(@CurrentUser() user: AuthUser, @Param("id") listingId: string) {
    return this.listingThreads.getOrCreate(user.sub, listingId);
  }
}

@UseGuards(JwtAuthGuard)
@Controller("listing-threads/:threadId/messages")
export class ListingThreadMessagesController {
  constructor(private readonly listingThreads: ListingThreadsService) {}

  @Get()
  findMessages(
    @CurrentUser() user: AuthUser,
    @Param("threadId") threadId: string,
  ) {
    return this.listingThreads.findMessages(user.sub, threadId);
  }

  @Post()
  sendMessage(
    @CurrentUser() user: AuthUser,
    @Param("threadId") threadId: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.listingThreads.sendMessage(user.sub, threadId, dto.body);
  }
}
