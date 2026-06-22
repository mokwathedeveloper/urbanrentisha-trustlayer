import { IsOptional, IsString, Matches, MinLength } from "class-validator";

const STELLAR_ADDRESS_REGEX = /^G[A-Z2-7]{55}$/;

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  @Matches(STELLAR_ADDRESS_REGEX, {
    message:
      "walletAddress must be a valid Stellar public key (starts with G, 56 characters).",
  })
  walletAddress?: string;
}
