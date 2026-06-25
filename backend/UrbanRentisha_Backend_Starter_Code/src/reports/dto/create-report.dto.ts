import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { ReportSeverity, ReportType } from "@prisma/client";

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

  @IsOptional()
  @IsEnum(ReportSeverity)
  severity?: ReportSeverity;

  @IsOptional()
  @IsBoolean()
  allowContact?: boolean;
}
