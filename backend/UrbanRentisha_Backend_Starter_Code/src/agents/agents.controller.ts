import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { AgentsService } from "./agents.service";

@UseGuards(JwtAuthGuard)
@Controller("agents")
export class AgentsController {
  constructor(private readonly agents: AgentsService) {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.agents.findOne(id);
  }
}
