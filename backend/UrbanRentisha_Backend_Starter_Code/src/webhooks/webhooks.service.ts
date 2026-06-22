import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { sha256 } from "../common/utils/hash.util";
import { RegisterWebhookDto } from "./dto/register-webhook.dto";

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  register(callerClientId: string, dto: RegisterWebhookDto) {
    if (callerClientId !== dto.apiClientId) {
      throw new ForbiddenException(
        "You can only register webhooks for your own API client.",
      );
    }

    return this.prisma.webhookEvent.create({
      data: {
        apiClientId: dto.apiClientId,
        event: dto.event,
        targetUrl: dto.targetUrl,
        secretHash: sha256(dto.secret),
      },
    });
  }

  list() {
    return this.prisma.webhookEvent.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        event: true,
        targetUrl: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        apiClient: { select: { id: true, name: true, status: true } },
      },
    });
  }
}
