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
import { SupportService } from "./support.service";
import { CreateMessageDto } from "../messages/dto/create-message.dto";

@UseGuards(JwtAuthGuard)
@Controller("support")
export class SupportController {
  constructor(private readonly support: SupportService) {}

  @Post("thread")
  getOrCreateMyThread(@CurrentUser() user: AuthUser) {
    return this.support.getOrCreateMyThread(user.sub);
  }

  @Get("threads/:id/messages")
  findMessages(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.support.findMessages(user.sub, user.role, id);
  }

  @Post("threads/:id/messages")
  sendMessage(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: CreateMessageDto,
  ) {
    return this.support.sendMessage(user.sub, user.role, id, dto.body);
  }

  @Patch("threads/:id/messages/read")
  markRead(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.support.markRead(user.sub, user.role, id);
  }
}
