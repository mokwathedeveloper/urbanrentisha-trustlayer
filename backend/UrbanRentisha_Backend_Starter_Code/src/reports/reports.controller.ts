import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { CreateReportDto } from "./dto/create-report.dto";
import { ReportsService } from "./reports.service";

@UseGuards(JwtAuthGuard)
@Controller("reports")
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateReportDto) {
    return this.reports.create(user.sub, dto);
  }

  @Get()
  findAll() {
    return this.reports.findAll();
  }

  @Get("mine")
  findMine(@CurrentUser() user: AuthUser) {
    return this.reports.findMine(user.sub);
  }
}
