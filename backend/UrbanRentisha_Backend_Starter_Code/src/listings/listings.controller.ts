import {
  Body,
  Controller,
  Delete,
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
import { CreateListingDto } from "./dto/create-listing.dto";
import { RejectListingDto } from "./dto/reject-listing.dto";
import { AddListingImageDto } from "./dto/add-listing-image.dto";
import { ListingsService } from "./listings.service";

@Controller("listings")
export class ListingsController {
  constructor(private readonly listings: ListingsService) {}

  @Get()
  findAll() {
    return this.listings.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("saved")
  findSaved(@CurrentUser() user: AuthUser) {
    return this.listings.findSaved(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get("mine")
  findMine(@CurrentUser() user: AuthUser) {
    return this.listings.findMine(user.sub, user.role);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.listings.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.LANDLORD, UserRole.AGENT, UserRole.MANAGER, UserRole.ADMIN)
  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateListingDto) {
    return this.listings.create(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/save")
  save(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.saveListing(user.sub, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/save")
  unsave(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.unsaveListing(user.sub, id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(":id/verify")
  verify(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.markVerified(id, user.sub);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch(":id/reject")
  reject(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: RejectListingDto,
  ) {
    return this.listings.reject(id, user.sub, dto.note);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/images")
  addImage(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Body() dto: AddListingImageDto,
  ) {
    return this.listings.addImage(id, user.sub, user.role, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id/images/:imageId")
  deleteImage(
    @CurrentUser() user: AuthUser,
    @Param("id") id: string,
    @Param("imageId") imageId: string,
  ) {
    return this.listings.deleteImage(id, imageId, user.sub, user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/mark-rented")
  markRented(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.markRented(id, user.sub, user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Post(":id/release-reservation")
  releaseReservation(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.releaseReservation(id, user.sub, user.role);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id/escrow")
  getEscrowPhase(@CurrentUser() user: AuthUser, @Param("id") id: string) {
    return this.listings.getEscrowPhase(id, user.sub, user.role);
  }
}
