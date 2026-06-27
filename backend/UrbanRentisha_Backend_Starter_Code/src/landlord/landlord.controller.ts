import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Throttle } from "@nestjs/throttler";
import { UserRole } from "@prisma/client";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { RolesGuard } from "../common/guards/roles.guard";
import { Roles } from "../common/decorators/roles.decorator";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { UPLOAD_THROTTLE } from "../common/constants/throttle-limits";
import { LandlordService } from "./landlord.service";

const DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;
const DOCUMENT_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
]);

const documentFileInterceptor = FileInterceptor("file", {
  limits: { fileSize: DOCUMENT_MAX_BYTES },
  fileFilter: (_req, file, callback) => {
    if (!DOCUMENT_MIME_TYPES.has(file.mimetype)) {
      return callback(
        new BadRequestException("Document must be a PNG, JPEG, or PDF file."),
        false,
      );
    }
    callback(null, true);
  },
});

@Controller("landlord")
export class LandlordController {
  constructor(private readonly landlord: LandlordService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD, UserRole.ADMIN, UserRole.PLATFORM)
  @Throttle(UPLOAD_THROTTLE)
  @Post("agents")
  @UseInterceptors(documentFileInterceptor)
  inviteAgent(
    @CurrentUser() user: AuthUser,
    @Body("name") name: string,
    @Body("email") email: string,
    @Body("role") role: "AGENT" | "MANAGER",
    @Body("landlordProfileId") landlordProfileId: string | undefined,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException("A document is required for the invite.");
    if (role !== "AGENT" && role !== "MANAGER") {
      throw new BadRequestException("role must be AGENT or MANAGER.");
    }
    return this.landlord.inviteAgent(
      user.sub,
      user.role,
      { name, email, role, landlordProfileId },
      file,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD, UserRole.ADMIN, UserRole.PLATFORM)
  @Get("team")
  getTeam(@CurrentUser() user: AuthUser) {
    return this.landlord.getTeam(user.sub, user.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @Get("escrow")
  getEscrowOverview(@CurrentUser() user: AuthUser) {
    return this.landlord.findEscrowOverview(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD)
  @Get("escrow/summary")
  getEscrowSummary(@CurrentUser() user: AuthUser) {
    return this.landlord.findEscrowSummary(user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD, UserRole.ADMIN, UserRole.PLATFORM)
  @Post("agents/:profileType/:profileId/activation-code")
  generateActivationCode(
    @CurrentUser() user: AuthUser,
    @Param("profileType") profileType: "agent" | "manager",
    @Param("profileId") profileId: string,
  ) {
    if (profileType !== "agent" && profileType !== "manager") {
      throw new BadRequestException("profileType must be agent or manager.");
    }
    return this.landlord.generateActivationCode(
      user.sub,
      user.role,
      profileType,
      profileId,
    );
  }

  @Throttle(UPLOAD_THROTTLE)
  @Post("agents/activate")
  @UseInterceptors(documentFileInterceptor)
  activate(
    @Body("email") email: string,
    @Body("activationCode") activationCode: string,
    @Body("newPassword") newPassword: string,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException("A document is required to activate.");
    if (!email || !activationCode || !newPassword) {
      throw new BadRequestException(
        "email, activationCode, and newPassword are required.",
      );
    }
    return this.landlord.activate({ email, activationCode, newPassword, file });
  }
}
