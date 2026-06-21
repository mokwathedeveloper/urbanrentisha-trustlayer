import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { UsersService } from "./users.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get("me")
  me(@CurrentUser() user: AuthUser) {
    return this.users.me(user.sub);
  }

  @Patch("me")
  updateProfile(@CurrentUser() user: AuthUser, @Body() dto: UpdateProfileDto) {
    return this.users.updateProfile(user.sub, dto);
  }

  @Patch("me/password")
  changePassword(
    @CurrentUser() user: AuthUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.users.changePassword(user.sub, dto);
  }
}
