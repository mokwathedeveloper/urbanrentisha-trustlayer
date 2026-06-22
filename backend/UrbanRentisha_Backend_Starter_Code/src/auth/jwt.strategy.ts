import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthUser } from "../common/types/auth-user.type";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("JWT_SECRET") ?? "dev-secret",
    });
  }

  async validate(payload: AuthUser): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: { status: true },
    });

    if (!user || user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException("This account has been suspended.");
    }

    return payload;
  }
}
