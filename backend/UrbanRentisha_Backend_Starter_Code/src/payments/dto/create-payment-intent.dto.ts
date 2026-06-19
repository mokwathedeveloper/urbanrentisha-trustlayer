import { IsOptional, IsString } from "class-validator";

export class CreatePaymentIntentDto {
  @IsString()
  viewingRequestId!: string;

  @IsOptional()
  @IsString()
  payerWallet?: string;
}
