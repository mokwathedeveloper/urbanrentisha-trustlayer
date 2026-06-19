import { IsEnum, IsOptional, IsString } from "class-validator";
import { ReportType } from "@prisma/client";

export class CreateReportDto {
  @IsOptional()
  @IsString()
  listingId?: string;

  @IsOptional()
  @IsString()
  viewingRequestId?: string;

  @IsEnum(ReportType)
  reportType!: ReportType;

  @IsString()
  description!: string;
}
