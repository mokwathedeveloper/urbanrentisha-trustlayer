import { IsOptional, IsString } from "class-validator";

export class SetAgentLandlordDto {
  @IsOptional()
  @IsString()
  landlordProfileId?: string | null;
}
