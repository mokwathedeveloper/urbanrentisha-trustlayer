import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../common/guards/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthUser } from "../common/types/auth-user.type";
import { UploadsService } from "./uploads.service";

const AVATAR_MAX_BYTES = 5 * 1024 * 1024;
const LISTING_IMAGE_MAX_BYTES = 8 * 1024 * 1024;
const DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;
const AVATAR_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);
const LISTING_IMAGE_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);
const DOCUMENT_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "application/pdf",
]);

@UseGuards(JwtAuthGuard)
@Controller("uploads")
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post("avatar")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: AVATAR_MAX_BYTES },
      fileFilter: (_req, file, callback) => {
        if (!AVATAR_MIME_TYPES.has(file.mimetype)) {
          return callback(
            new BadRequestException(
              "Avatar must be a PNG, JPEG, or WEBP image.",
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadAvatar(
    @CurrentUser() user: AuthUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException("No file was provided.");
    return this.uploads.uploadAvatar(user.sub, file);
  }

  @Post("listing-image")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: LISTING_IMAGE_MAX_BYTES },
      fileFilter: (_req, file, callback) => {
        if (!LISTING_IMAGE_MIME_TYPES.has(file.mimetype)) {
          return callback(
            new BadRequestException(
              "Listing image must be a PNG, JPEG, or WEBP image.",
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadListingImage(
    @CurrentUser() user: AuthUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException("No file was provided.");
    return this.uploads.uploadListingImage(user.sub, file);
  }

  @Post("documents")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: DOCUMENT_MAX_BYTES },
      fileFilter: (_req, file, callback) => {
        if (!DOCUMENT_MIME_TYPES.has(file.mimetype)) {
          return callback(
            new BadRequestException(
              "Document must be a PNG, JPEG, or PDF file.",
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  uploadDocument(
    @CurrentUser() user: AuthUser,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException("No file was provided.");
    return this.uploads.uploadDocument(user.sub, user.role, file);
  }
}
