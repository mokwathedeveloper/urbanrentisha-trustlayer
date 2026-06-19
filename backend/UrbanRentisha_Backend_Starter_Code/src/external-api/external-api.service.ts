import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { sha256 } from "../common/utils/hash.util";
import { ExternalCreateViewingRequestDto } from "./dto/external-create-viewing-request.dto";

@Injectable()
export class ExternalApiService {
  constructor(private readonly prisma: PrismaService) {}

  async validateApiKey(apiKey?: string) {
    if (!apiKey) throw new UnauthorizedException("Missing x-api-key header.");
    const apiKeyHash = sha256(apiKey);

    const client = await this.prisma.apiClient.findFirst({
      where: { apiKeyHash, status: "active" },
    });

    if (!client) throw new UnauthorizedException("Invalid API key.");
    return client;
  }

  async createExternalViewingRequest(dto: ExternalCreateViewingRequestDto) {
    return {
      message: "External viewing request accepted.",
      listingId: dto.listingId,
      tenantExternalId: dto.tenantExternalId,
      nextStep:
        "Map external tenant to internal tenant profile, then create payment intent.",
    };
  }
}
