import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { GenerateProofDto } from "./dto/generate-proof.dto";
import { ZkProofsService } from "./zk-proofs.service";

@UseGuards(JwtAuthGuard)
@Controller("zk-proofs")
export class ZkProofsController {
  constructor(private readonly zkProofs: ZkProofsService) {}

  @Post("generate")
  generate(@CurrentUser() user: AuthUser, @Body() dto: GenerateProofDto) {
    return this.zkProofs.generate(user.sub, user.role, dto);
  }

  @Get(":id")
  findOne(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.zkProofs.findOne(id, user.sub, user.role);
  }
}
