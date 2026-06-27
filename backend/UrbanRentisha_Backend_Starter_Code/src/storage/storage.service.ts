import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageClient } from "@supabase/storage-js";
import { randomUUID } from "crypto";
import { withRetry, withTimeout } from "../common/utils/resilience.util";

const AVATARS_BUCKET = "avatars";
const DOCUMENTS_BUCKET = "verification-documents";
const LISTING_IMAGES_BUCKET = "listing-images";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

// Uploads generate a fresh randomUUID() path per attempt - retrying one
// blindly would leave an orphaned duplicate blob behind, so these are
// timeout-bounded only, never retried. Signing an already-uploaded
// document's URL is a pure read and safe to retry.
const READ_TIMEOUT_MS = 8_000;
const WRITE_TIMEOUT_MS = 20_000;

@Injectable()
export class StorageService {
  private readonly client: StorageClient;

  constructor(private readonly config: ConfigService) {
    const url = this.config.get<string>("SUPABASE_URL");
    const serviceRoleKey = this.config.get<string>("SUPABASE_SERVICE_ROLE_KEY");
    if (!url || !serviceRoleKey) {
      throw new InternalServerErrorException(
        "Supabase storage is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
      );
    }
    this.client = new StorageClient(`${url}/storage/v1`, {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
    });
  }

  /**
   * Uploads to a fresh, randomUUID()-derived path - never retried (a
   * blind retry on an ambiguous failure would leave an orphaned duplicate
   * blob behind), only timeout-bounded. A timeout is folded into the same
   * `{ error }` shape Supabase itself returns, so callers have one
   * consistent failure path regardless of which kind of failure occurred.
   */
  private async timedUpload(
    bucket: string,
    path: string,
    file: Express.Multer.File,
    label: string,
  ): Promise<{ error: { message: string } | null }> {
    try {
      return await withTimeout(
        () =>
          this.client.from(bucket).upload(path, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          }),
        WRITE_TIMEOUT_MS,
        label,
      );
    } catch (error) {
      return { error: { message: (error as Error).message } };
    }
  }

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const extension = file.originalname.split(".").pop() ?? "jpg";
    const path = `${userId}/${randomUUID()}.${extension}`;

    const { error } = await this.timedUpload(
      AVATARS_BUCKET,
      path,
      file,
      "storage.uploadAvatar",
    );
    if (error)
      throw new InternalServerErrorException(
        `Avatar upload failed: ${error.message}`,
      );

    const { data } = this.client.from(AVATARS_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async uploadListingImage(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const extension = file.originalname.split(".").pop() ?? "jpg";
    const path = `${userId}/${randomUUID()}.${extension}`;

    const { error } = await this.timedUpload(
      LISTING_IMAGES_BUCKET,
      path,
      file,
      "storage.uploadListingImage",
    );
    if (error)
      throw new InternalServerErrorException(
        `Listing image upload failed: ${error.message}`,
      );

    const { data } = this.client.from(LISTING_IMAGES_BUCKET).getPublicUrl(path);
    return data.publicUrl;
  }

  async uploadDocument(
    userId: string,
    file: Express.Multer.File,
  ): Promise<{ fileUrl: string; fileName: string }> {
    const extension = file.originalname.split(".").pop() ?? "pdf";
    const path = `${userId}/${randomUUID()}.${extension}`;

    const { error } = await this.timedUpload(
      DOCUMENTS_BUCKET,
      path,
      file,
      "storage.uploadDocument",
    );
    if (error)
      throw new InternalServerErrorException(
        `Document upload failed: ${error.message}`,
      );

    return { fileUrl: path, fileName: file.originalname };
  }

  /** Pure read (signs a URL for an already-uploaded document) - safe to retry. */
  async getDocumentSignedUrl(path: string): Promise<string> {
    try {
      return await withRetry(
        async () => {
          const { data, error } = await this.client
            .from(DOCUMENTS_BUCKET)
            .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
          if (error || !data) {
            throw new Error(error?.message ?? "no data returned");
          }
          return data.signedUrl;
        },
        { timeoutMs: READ_TIMEOUT_MS, label: "storage.getDocumentSignedUrl" },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not sign document URL: ${(error as Error).message}`,
      );
    }
  }
}
