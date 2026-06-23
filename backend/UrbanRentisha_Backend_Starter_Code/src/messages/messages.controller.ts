import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { MessagesService } from "./messages.service";
import { CreateMessageDto } from "./dto/create-message.dto";

@UseGuards(JwtAuthGuard)
@Controller()
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Get("messages")
  findInbox(@CurrentUser() user: AuthUser) {
    return this.messages.findInbox(user.sub, user.role);
  }

  @Get("viewing-requests/:id/messages")
  findForRequest(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.messages.findForRequest(user.sub, id);
  }

  @Post("viewing-requests/:id/messages")
  create(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.messages.create(user.sub, id, dto);
  }

  @Patch("viewing-requests/:id/messages/read")
  markRead(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.messages.markRequestThreadRead(user.sub, id);
  }
}
