"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ApiError, api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { extractExif, type ExifResult } from "@/lib/exif/parser";
import { reverseGeocode } from "@/lib/geocode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { InlineSpinner } from "@/components/ui/spinner";

const MAX_IMAGES = 6;

interface ListingImageDraft {
  id: string;
  previewUrl: string;
  uploading: boolean;
  uploadedUrl: string | null;
  error: string | null;
  exif: ExifResult | null;
}

export default function NewListingPage() {
  const { token, user } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    address: "",
    rentAmount: "",
    currency: "KES",
    viewingFee: "",
    propertyType: "Apartment",
    bedrooms: "",
    bathrooms: "",
  });
  const [images, setImages] = useState<ListingImageDraft[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadedImages = images.filter((img) => img.uploadedUrl);
  const isUploading = images.some((img) => img.uploading);

  async function handleFilesSelected(files: FileList) {
    if (!token) return;
    const remainingSlots = MAX_IMAGES - images.length;
    const selected = Array.from(files).slice(0, Math.max(0, remainingSlots));

    for (const file of selected) {
      const draft: ListingImageDraft = {
        id: `${file.name}-${Date.now()}-${Math.random()}`,
        previewUrl: URL.createObjectURL(file),
        uploading: true,
        uploadedUrl: null,
        error: null,
        exif: null,
      };
      setImages((prev) => [...prev, draft]);

      // Check for real GPS data before uploading anything - a photo with no
      // location metadata (a screenshot, a downloaded image, a re-saved
      // file) cannot be used as evidence for this property at all.
      const exifResult = await extractExif(file);
      if (!exifResult.gpsPresent) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === draft.id
              ? {
                  ...img,
                  uploading: false,
                  exif: exifResult,
                  error: "No location (GPS) data found in this photo. Enable location services on your camera and retake it.",
                }
              : img,
          ),
        );
        continue;
      }

      try {
        const uploadResult = await api.uploads.listingImage(token, file);
        setImages((prev) =>
          prev.map((img) =>
            img.id === draft.id
              ? { ...img, uploading: false, uploadedUrl: uploadResult.imageUrl, exif: exifResult }
              : img,
          ),
        );

        if (exifResult.lat != null && exifResult.lng != null) {
          reverseGeocode(exifResult.lat, exifResult.lng).then((place) => {
            if (!place) return;
            setForm((current) => (current.location.trim() ? current : { ...current, location: place }));
          });
        }
      } catch (err) {
        const message = err instanceof ApiError ? err.message : "Could not upload image.";
        setImages((prev) =>
          prev.map((img) => (img.id === draft.id ? { ...img, uploading: false, error: message } : img)),
        );
      }
    }
  }

  function removeImage(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  const isAllowed =
    user?.role === "LANDLORD" || user?.role === "AGENT" || user?.role === "MANAGER" || user?.role === "ADMIN";

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    if (uploadedImages.length === 0) {
      setError("Please upload at least one property photo before submitting.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const listing = await api.listings.create(token, {
        title: form.title,
        description: form.description,
        location: form.location,
        address: form.address || undefined,
        rentAmount: Number(form.rentAmount),
        currency: form.currency,
        viewingFee: Number(form.viewingFee),
        propertyType: form.propertyType,
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        imageUrl: uploadedImages[0].uploadedUrl ?? undefined,
      });

      await Promise.all(
        // Only images that passed the GPS check in handleFilesSelected ever
        // get an uploadedUrl, so exif.lat/lng/gpsPresent are always present here.
        uploadedImages.map((img) =>
          api.listings.addImage(token, listing.id, {
            url: img.uploadedUrl!,
            latitude: img.exif!.lat!,
            longitude: img.exif!.lng!,
            capturedAt: img.exif?.capturedAt ? img.exif.capturedAt.toISOString() : undefined,
            device: img.exif?.device ?? undefined,
            gpsPresent: true,
          }),
        ),
      );

      router.push(`/listings/${listing.id}`);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Could not create listing.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!isAllowed) {
    return (
      <div className="px-6 py-8">
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">List a Property</h1>
        <p className="mt-4 text-sm text-ur-error">
          Only verified agents, property managers, and admins can list properties.
        </p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8">
      <div className="flex items-center gap-2">
        <Icon name="apartment" size={24} className="text-ur-primary" />
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">List a Property</h1>
      </div>
      <p className="mt-1 text-sm text-ur-text-secondary">
        New listings are submitted for admin verification before going live.
      </p>

      <form onSubmit={handleSubmit} className="ur-card mt-6 max-w-2xl space-y-4 p-6">
        <Input label="Title" name="title" value={form.title} onChange={(e) => update("title", e.target.value)} required />

        <div className="space-y-2">
          <label className="block text-xs font-semibold tracking-[0.04em] text-ur-text-secondary">
            Property Photos <span className="text-ur-error">*</span>
            <span className="ml-1 font-normal text-ur-text-muted">({images.length}/{MAX_IMAGES})</span>
          </label>
          <p className="text-sm text-ur-text-secondary">
            Upload real photos of this property - not screenshots or images from other listings. Each photo must
            have location (GPS) data embedded by the camera; photos without it are rejected automatically.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) handleFilesSelected(e.target.files);
              e.target.value = "";
            }}
          />

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {images.map((img) => (
              <div key={img.id} className="space-y-1.5 rounded-ur border border-ur-border bg-ur-card-soft p-2">
                <div className="relative h-24 w-full overflow-hidden rounded-ur-sm bg-ur-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.previewUrl} alt="Property photo" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(img.id)}
                    className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white"
                    aria-label="Remove photo"
                  >
                    <Icon name="close" size={14} />
                  </button>
                </div>

                {img.uploading ? (
                  <InlineSpinner label="Checking location data..." />
                ) : img.error ? (
                  <p className="text-xs text-ur-error">{img.error}</p>
                ) : img.exif?.gpsPresent ? (
                  <div className="space-y-1">
                    <a
                      href={`https://maps.google.com/?q=${img.exif.lat},${img.exif.lng}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-ur-primary hover:underline"
                    >
                      <Icon name="location_on" size={12} />
                      GPS verified
                    </a>
                    {img.exif.ageWarning ? (
                      <Badge variant="warning" className="px-2 py-0.5 text-[10px]">
                        Photo is old
                      </Badge>
                    ) : null}
                    {img.exif.device ? (
                      <p className="truncate text-[10px] text-ur-text-muted">{img.exif.device}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}

            {images.length < MAX_IMAGES ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="grid h-36 place-items-center rounded-ur border border-dashed border-ur-border bg-ur-card-soft text-ur-text-muted hover:border-ur-primary hover:text-ur-primary"
              >
                <span className="flex flex-col items-center gap-1 text-xs">
                  <Icon name="add_circle" size={20} />
                  Add Photo
                </span>
              </button>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold tracking-[0.04em] text-ur-text-secondary">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            rows={3}
            required
            className="w-full rounded-ur-sm border border-ur-border bg-ur-input px-3 py-2 text-sm text-ur-text"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Location"
            name="location"
            value={form.location}
            onChange={(e) => update("location", e.target.value)}
            helperText="Auto-filled from your first photo's GPS data - edit if needed."
            required
          />
          <Input label="Address" name="address" value={form.address} onChange={(e) => update("address", e.target.value)} required />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Rent Amount"
            name="rentAmount"
            type="number"
            min={1}
            value={form.rentAmount}
            onChange={(e) => update("rentAmount", e.target.value)}
            required
          />
          <Input label="Currency" name="currency" value={form.currency} onChange={(e) => update("currency", e.target.value)} required />
          <Input
            label="Viewing Fee"
            name="viewingFee"
            type="number"
            min={0}
            value={form.viewingFee}
            onChange={(e) => update("viewingFee", e.target.value)}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Property Type" name="propertyType" value={form.propertyType} onChange={(e) => update("propertyType", e.target.value)} required />
          <Input label="Bedrooms" name="bedrooms" type="number" min={0} value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} required />
          <Input label="Bathrooms" name="bathrooms" type="number" min={0} value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} required />
        </div>

        {error ? <p className="text-sm text-ur-error">{error}</p> : null}

        <Button
          type="submit"
          disabled={isUploading || uploadedImages.length === 0}
          loading={submitting}
        >
          {submitting ? "Submitting..." : "Submit for Verification"}
        </Button>
      </form>
    </div>
  );
}
