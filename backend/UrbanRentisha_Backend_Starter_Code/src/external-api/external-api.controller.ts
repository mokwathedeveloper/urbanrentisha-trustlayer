import { Body, Controller, Headers, Post } from "@nestjs/common";
import { ExternalApiService } from "./external-api.service";
import { ExternalCreateViewingRequestDto } from "./dto/external-create-viewing-request.dto";

@Controller("external")
export class ExternalApiController {
  constructor(private readonly externalApi: ExternalApiService) {}

  @Post("viewing-requests")
  async createViewingRequest(
    @Headers("x-api-key") apiKey: string,
    @Body() dto: ExternalCreateViewingRequestDto
  ) {
    await this.externalApi.validateApiKey(apiKey);
    return this.externalApi.createExternalViewingRequest(dto);
  }
}
