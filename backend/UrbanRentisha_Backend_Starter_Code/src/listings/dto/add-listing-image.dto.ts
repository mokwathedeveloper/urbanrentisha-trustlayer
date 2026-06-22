import {
  Equals,
  IsDateString,
  IsLatitude,
  IsLongitude,
  IsOptional,
  IsString,
} from "class-validator";

export class AddListingImageDto {
  @IsString()
  url!: string;

  // Required, not optional: a photo with no GPS EXIF data is rejected
  // outright, so latitude/longitude must always be present here.
  @IsLatitude()
  latitude!: number;

  @IsLongitude()
  longitude!: number;

  @IsOptional()
  @IsDateString()
  capturedAt?: string;

  @IsOptional()
  @IsString()
  device?: string;

  // Must be exactly `true` - the frontend only reaches this endpoint after
  // confirming real GPS EXIF data was found in the photo.
  @Equals(true)
  gpsPresent!: boolean;
}
