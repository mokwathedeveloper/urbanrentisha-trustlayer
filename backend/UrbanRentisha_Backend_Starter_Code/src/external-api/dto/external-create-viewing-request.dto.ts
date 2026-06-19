import { IsOptional, IsString } from "class-validator";

export class ExternalCreateViewingRequestDto {
  @IsString()
  listingId!: string;

  @IsString()
  tenantExternalId!: string;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsString()
  preferredTime?: string;
}
