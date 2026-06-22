import { IsEmail, IsIn, IsOptional, IsString } from "class-validator";
import { UserRole } from "@prisma/client";

export const INVITABLE_ROLES = [UserRole.AGENT, UserRole.MANAGER] as const;

export class InviteAgentDto {
  @IsEmail()
  email!: string;

  @IsString()
  name!: string;

  @IsIn(INVITABLE_ROLES)
  role!: UserRole;

  @IsOptional()
  @IsString()
  landlordProfileId?: string;
}
