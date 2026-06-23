import { IsEnum, IsOptional, IsString } from "class-validator";
import { ReportStatus } from "@prisma/client";

export class RespondToReportDto {
  @IsEnum(ReportStatus)
  status!: ReportStatus;

  @IsOptional()
  @IsString()
  note?: string;
}
