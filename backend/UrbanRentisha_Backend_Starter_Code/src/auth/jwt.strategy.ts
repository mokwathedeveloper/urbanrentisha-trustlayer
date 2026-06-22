import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthUser } from "../common/types/auth-user.type";

const PRESENCE_THROTTLE_MS = 60_000;

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
      select: { status: true, lastActiveAt: true },
    });

    if (!user || user.status === UserStatus.SUSPENDED) {
      throw new UnauthorizedException("This account has been suspended.");
    }

    const isStale =
      !user.lastActiveAt ||
      Date.now() - user.lastActiveAt.getTime() > PRESENCE_THROTTLE_MS;
    if (isStale) {
      // Fire-and-forget: presence is best-effort and must never add latency
      // or failure risk to the auth path itself.
      this.prisma.user
        .update({
          where: { id: payload.sub },
          data: { lastActiveAt: new Date() },
        })
        .catch(() => undefined);
    }

    return payload;
  }
}
