import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StorageClient } from "@supabase/storage-js";
import { randomUUID } from "crypto";

const AVATARS_BUCKET = "avatars";
const DOCUMENTS_BUCKET = "verification-documents";
const LISTING_IMAGES_BUCKET = "listing-images";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

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

  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<string> {
    const extension = file.originalname.split(".").pop() ?? "jpg";
    const path = `${userId}/${randomUUID()}.${extension}`;

    const { error } = await this.client
      .from(AVATARS_BUCKET)
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });
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

    const { error } = await this.client
      .from(LISTING_IMAGES_BUCKET)
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });
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

    const { error } = await this.client
      .from(DOCUMENTS_BUCKET)
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });
    if (error)
      throw new InternalServerErrorException(
        `Document upload failed: ${error.message}`,
      );

    return { fileUrl: path, fileName: file.originalname };
  }

  async getDocumentSignedUrl(path: string): Promise<string> {
    const { data, error } = await this.client
      .from(DOCUMENTS_BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (error || !data) {
      throw new InternalServerErrorException(
        `Could not sign document URL: ${error?.message}`,
      );
    }
    return data.signedUrl;
  }
}
