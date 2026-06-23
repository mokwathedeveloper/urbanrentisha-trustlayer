import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { CreateReportDto } from "./dto/create-report.dto";
import { RespondToReportDto } from "./dto/respond-to-report.dto";
import { ReportsService } from "./reports.service";

@UseGuards(JwtAuthGuard)
@Controller("reports")
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateReportDto) {
    return this.reports.create(user.sub, dto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PLATFORM)
  @Get()
  findAll() {
    return this.reports.findAll();
  }

  @Get("mine")
  findMine(@CurrentUser() user: AuthUser) {
    return this.reports.findMine(user.sub);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PLATFORM)
  @Patch(":id/respond")
  respond(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: RespondToReportDto,
  ) {
    return this.reports.respond(id, user.sub, dto);
  }
}
