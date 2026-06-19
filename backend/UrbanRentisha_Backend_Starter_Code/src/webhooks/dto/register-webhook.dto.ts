import { IsString, IsUrl } from "class-validator";

export class RegisterWebhookDto {
  @IsString()
  apiClientId!: string;

  @IsString()
  event!: string;

  @IsUrl()
  targetUrl!: string;

  @IsString()
  secret!: string;
}
