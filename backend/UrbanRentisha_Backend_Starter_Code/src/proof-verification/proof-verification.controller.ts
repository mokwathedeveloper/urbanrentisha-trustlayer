import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { PROOF_THROTTLE } from "../common/constants/throttle-limits";
import { SubmitProofVerificationDto } from "./dto/submit-proof-verification.dto";
import { ProofVerificationService } from "./proof-verification.service";

@UseGuards(JwtAuthGuard)
@Controller("proof-verification")
export class ProofVerificationController {
  constructor(private readonly proofVerification: ProofVerificationService) {}

  @Throttle(PROOF_THROTTLE)
  @Post("submit")
  submit(
    @CurrentUser() user: AuthUser,
    @Body() dto: SubmitProofVerificationDto,
  ) {
    return this.proofVerification.submit(user.sub, user.role, dto);
  }

  @Get(":id")
  findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.proofVerification.findOne(id, user.sub, user.role);
  }
}
