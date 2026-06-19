import { IsInt, IsOptional, IsString, Min } from "class-validator";

export class CreateListingDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  location!: string;

  @IsOptional()
  @IsString()
  address?: string;

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

  @IsOptional()
  @IsInt()
  bedrooms?: number;

  @IsOptional()
  @IsInt()
  bathrooms?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
