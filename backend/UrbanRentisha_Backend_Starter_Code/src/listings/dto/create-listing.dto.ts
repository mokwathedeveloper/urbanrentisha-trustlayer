import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  location!: string;

  @IsString()
  address!: string;

  @IsInt()
  @Min(1)
  rentAmount!: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsInt()
  @Min(0)
  viewingFee!: number;

  @IsString()
  propertyType!: string;

  @IsInt()
  @Min(0)
  bedrooms!: number;

  @IsInt()
  @Min(0)
  bathrooms!: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
