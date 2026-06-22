import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { UserRole } from "@prisma/client";

/**
 * Roles a user may select for themselves at signup. ADMIN and PLATFORM are
 * deliberately excluded — those accounts are created only via the seed
 * script / a trusted admin-only flow, never through public registration.
 * AGENT and MANAGER are also excluded — those accounts must be created by
 * a landlord (or admin) via the invite flow, never self-registered, so a
 * landlord can vouch for who represents their properties.
 */
export const SELF_REGISTERABLE_ROLES = [
  UserRole.TENANT,
  UserRole.LANDLORD,
] as const;

export class RegisterDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsString()
  @MinLength(8)
  password!: string;

  @IsIn(SELF_REGISTERABLE_ROLES)
  role!: UserRole;

  @IsOptional()
  @IsString()
  phone?: string;
}
