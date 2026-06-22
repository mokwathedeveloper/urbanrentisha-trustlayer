import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { GenerateViewingCodeDto } from "./dto/generate-viewing-code.dto";
import { ViewingCodesService } from "./viewing-codes.service";

@Controller("viewing-codes")
export class ViewingCodesController {
  constructor(private readonly viewingCodes: ViewingCodesService) {}

  @UseGuards(JwtAuthGuard)
  @Post("generate")
  generate(@CurrentUser() user: AuthUser, @Body() dto: GenerateViewingCodeDto) {
    return this.viewingCodes.generate(user.sub, user.role, dto);
  }

  @Get(":code/verify")
  verify(@Param("code") code: string) {
    return this.viewingCodes.verify(code);
  }
}
