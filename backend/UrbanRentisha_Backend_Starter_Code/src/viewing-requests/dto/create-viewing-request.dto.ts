import { IsOptional, IsString } from "class-validator";

export class CreateViewingRequestDto {
  @IsString()
  listingId!: string;

  @IsOptional()
  @IsString()
  preferredDate?: string;

  @IsOptional()
  @IsString()
  preferredTime?: string;
}
