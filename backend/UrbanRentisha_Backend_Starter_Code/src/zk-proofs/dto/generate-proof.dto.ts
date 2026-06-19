import { IsString } from "class-validator";

export class GenerateProofDto {
  @IsString()
  viewingRequestId!: string;
}
