import { IsIn } from "class-validator";
import { UserStatus } from "@prisma/client";

export class UpdateUserStatusDto {
  @IsIn([UserStatus.ACTIVE, UserStatus.SUSPENDED])
  status!: UserStatus;
}
