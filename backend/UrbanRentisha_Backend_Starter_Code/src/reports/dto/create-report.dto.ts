import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from "class-validator";
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

  @IsOptional()
  @IsIn(["high", "medium", "low"])
  severity?: string;

  @IsOptional()
  @IsBoolean()
  allowContact?: boolean;
}
