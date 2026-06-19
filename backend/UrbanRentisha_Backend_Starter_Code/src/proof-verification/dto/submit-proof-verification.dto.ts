import { IsString } from "class-validator";

export class SubmitProofVerificationDto {
  @IsString()
  viewingRequestId!: string;
}
