import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { sha256 } from "../common/utils/hash.util";
import { RegisterWebhookDto } from "./dto/register-webhook.dto";

@Injectable()
export class WebhooksService {
  constructor(private readonly prisma: PrismaService) {}

  register(dto: RegisterWebhookDto) {
    return this.prisma.webhookEvent.create({
      data: {
        apiClientId: dto.apiClientId,
        event: dto.event,
        targetUrl: dto.targetUrl,
        secretHash: sha256(dto.secret)
      }
    });
  }

  list() {
    return this.prisma.webhookEvent.findMany({
      orderBy: { createdAt: "desc" },
      include: { apiClient: true }
    });
  }
}
