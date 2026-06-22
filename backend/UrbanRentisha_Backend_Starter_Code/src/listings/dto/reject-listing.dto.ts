import { IsOptional, IsString } from "class-validator";

export class RejectListingDto {
  @IsOptional()
  @IsString()
  note?: string;
}
