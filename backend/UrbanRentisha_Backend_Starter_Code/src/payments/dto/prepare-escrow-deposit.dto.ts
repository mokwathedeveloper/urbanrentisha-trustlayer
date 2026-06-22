import { IsString } from "class-validator";

export class PrepareEscrowDepositDto {
  @IsString()
  payerPublicKey!: string;
}
