import { IsEnum, IsOptional, IsString } from "class-validator";

export enum VerificationDecision {
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  NEEDS_CORRECTION = "NEEDS_CORRECTION",
}

export class ReviewVerificationDto {
  @IsEnum(VerificationDecision)
  decision!: VerificationDecision;

  @IsOptional()
  @IsString()
  note?: string;
}
