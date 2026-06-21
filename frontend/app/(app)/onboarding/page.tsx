"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";
import { ApiError, api } from "@/lib/api";

const VERIFIABLE_ROLES = new Set(["LANDLORD", "AGENT", "MANAGER"]);

export default function OnboardingPage() {
  const router = useRouter();
  const { user, token, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploaded, setAvatarUploaded] = useState(Boolean(user?.avatarUrl));
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const [documentUploaded, setDocumentUploaded] = useState(false);
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [documentError, setDocumentError] = useState<string | null>(null);
  const [documentName, setDocumentName] = useState<string | null>(null);

  const needsDocuments = user ? VERIFIABLE_ROLES.has(user.role) : false;
  const canContinue = avatarUploaded && (!needsDocuments || documentUploaded);

  async function handleAvatarSelect(file: File) {
    if (!token) return;
    setAvatarError(null);
    setAvatarPreview(URL.createObjectURL(file));
    setUploadingAvatar(true);
    try {
      await api.uploads.avatar(token, file);
      await refreshUser();
      setAvatarUploaded(true);
    } catch (err) {
      setAvatarError(err instanceof ApiError ? err.message : "Could not upload profile picture.");
      setAvatarUploaded(false);
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleDocumentSelect(file: File) {
    if (!token) return;
    setDocumentError(null);
    setUploadingDocument(true);
    try {
      await api.uploads.documents(token, file);
      setDocumentUploaded(true);
      setDocumentName(file.name);
    } catch (err) {
      setDocumentError(err instanceof ApiError ? err.message : "Could not upload document.");
    } finally {
      setUploadingDocument(false);
    }
  }

  function handleContinue() {
    router.push("/dashboard");
  }

  return (
    <main className="ur-muted-grid flex min-h-screen items-center justify-center bg-ur-page px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="ur-card p-6 sm:p-8">
          <h1 className="text-2xl font-black tracking-[-0.03em] text-ur-navy">Complete your profile</h1>
          <p className="mt-1 text-sm text-ur-text-secondary">
            A few quick steps to set up your UrbanRentisha TrustLayer account.
          </p>

          <div className="mt-6 space-y-2">
            <StepHeader done={avatarUploaded} index={1} label="Profile Picture" required />
            <div className="flex items-center gap-4 rounded-ur border border-ur-border bg-ur-card-soft p-4">
              <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-full bg-ur-card text-xl font-bold text-ur-primary">
                {avatarPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatarPreview} alt="Profile preview" className="h-full w-full object-cover" />
                ) : (
                  (user?.name?.charAt(0) ?? "?").toUpperCase()
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-ur-text-secondary">
                  A clear photo of your face helps build trust with tenants, landlords, and agents.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleAvatarSelect(file);
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  disabled={uploadingAvatar}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="add" size={14} />
                  {uploadingAvatar ? "Uploading..." : avatarUploaded ? "Replace photo" : "Upload photo"}
                </Button>
                {avatarError ? <p className="mt-1 text-xs text-ur-error">{avatarError}</p> : null}
              </div>
            </div>
          </div>

          {needsDocuments ? (
            <div className="mt-6 space-y-2">
              <StepHeader done={documentUploaded} index={2} label="Verification Documents" required />
              <div className="rounded-ur border border-ur-border bg-ur-card-soft p-4">
                <p className="text-sm text-ur-text-secondary">
                  {user?.role === "LANDLORD"
                    ? "Upload proof of property ownership or a company registration document. An admin will review it before your account is fully verified."
                    : "Upload documentation proving you're authorized to represent the landlord or property you listed (e.g. an agency license or letter of authorization). An admin will review it."}
                </p>
                <input
                  ref={docInputRef}
                  type="file"
                  accept="image/png,image/jpeg,application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleDocumentSelect(file);
                  }}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="mt-3"
                  disabled={uploadingDocument}
                  onClick={() => docInputRef.current?.click()}
                >
                  <Icon name="description" size={14} />
                  {uploadingDocument ? "Uploading..." : documentUploaded ? "Replace document" : "Upload document"}
                </Button>
                {documentName ? (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-ur-primary">
                    <Icon name="check_circle" size={14} />
                    {documentName}
                  </p>
                ) : null}
                {documentError ? <p className="mt-1 text-xs text-ur-error">{documentError}</p> : null}
              </div>
            </div>
          ) : null}

          <Button type="button" className="mt-6 w-full" size="lg" disabled={!canContinue} onClick={handleContinue}>
            Continue to Dashboard
            <Icon name="arrow_forward" size={16} />
          </Button>
        </div>
      </div>
    </main>
  );
}

function StepHeader({ done, index, label, required }: { done: boolean; index: number; label: string; required: boolean }) {
  return (
    <div className="flex items-center gap-2 text-sm font-bold text-ur-navy">
      <span
        className={`grid h-6 w-6 place-items-center rounded-full text-xs ${
          done ? "bg-ur-primary text-white" : "border border-ur-border-strong text-ur-text-muted"
        }`}
      >
        {done ? <Icon name="check" size={14} /> : index}
      </span>
      {label}
      {required ? <span className="text-xs font-normal text-ur-text-muted">(required)</span> : null}
    </div>
  );
}
