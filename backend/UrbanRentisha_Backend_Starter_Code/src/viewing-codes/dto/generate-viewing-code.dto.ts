import { IsString } from "class-validator";

export class GenerateViewingCodeDto {
  @IsString()
  viewingRequestId!: string;
}
