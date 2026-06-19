import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterWebhookDto } from "./dto/register-webhook.dto";
import { WebhooksService } from "./webhooks.service";

@Controller("webhooks")
export class WebhooksController {
  constructor(private readonly webhooks: WebhooksService) {}

  @Post()
  register(@Body() dto: RegisterWebhookDto) {
    return this.webhooks.register(dto);
  }

  @Get()
  list() {
    return this.webhooks.list();
  }
}
