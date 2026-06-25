import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";

// Tighter than the global default (60/min) - login/register are the
// brute-force/credential-stuffing/spam-signup surface, unlike the rest of
// the API which is already behind JWT auth.
const AUTH_THROTTLE = { default: { limit: 5, ttl: 60_000 } };

@Controller("auth")
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Throttle(AUTH_THROTTLE)
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Throttle(AUTH_THROTTLE)
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get("me")
  me(@CurrentUser() user: AuthUser) {
    return this.auth.me(user.sub);
  }
}
