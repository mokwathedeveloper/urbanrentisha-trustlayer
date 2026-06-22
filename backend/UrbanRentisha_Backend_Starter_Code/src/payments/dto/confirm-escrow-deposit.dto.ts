import { IsString } from "class-validator";

export class ConfirmEscrowDepositDto {
  @IsString()
  signedXdr!: string;
}
