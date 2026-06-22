import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { ExternalApiService } from "../external-api/external-api.service";
import { RegisterWebhookDto } from "./dto/register-webhook.dto";
import { WebhooksService } from "./webhooks.service";

@Controller("webhooks")
export class WebhooksController {
  constructor(
    private readonly webhooks: WebhooksService,
    private readonly externalApi: ExternalApiService,
  ) {}

  @Post()
  async register(
    @Headers("x-api-key") apiKey: string,
    @Body() dto: RegisterWebhookDto,
  ) {
    const client = await this.externalApi.validateApiKey(apiKey);
    return this.webhooks.register(client.id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PLATFORM)
  @Get()
  list() {
    return this.webhooks.list();
  }
}
