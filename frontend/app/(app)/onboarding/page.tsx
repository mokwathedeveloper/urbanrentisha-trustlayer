"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/lib/auth";
import { ApiError, api, type DocumentType } from "@/lib/api";

const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  ID_CARD: "National ID / Passport",
  GOOD_CONDUCT: "Certificate of Good Conduct",
  PERSONAL_DOCUMENT: "Proof of Address",
  ASSET_DOCUMENT: "Proof of Property Ownership",
};

const ROLE_REQUIRED_DOCUMENTS: Record<string, DocumentType[]> = {
  LANDLORD: ["ID_CARD", "GOOD_CONDUCT", "PERSONAL_DOCUMENT", "ASSET_DOCUMENT"],
  AGENT: ["ID_CARD", "GOOD_CONDUCT", "PERSONAL_DOCUMENT"],
  MANAGER: ["ID_CARD", "GOOD_CONDUCT", "PERSONAL_DOCUMENT"],
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user, token, refreshUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarUploaded, setAvatarUploaded] = useState(Boolean(user?.avatarUrl));
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const requiredDocuments = user ? ROLE_REQUIRED_DOCUMENTS[user.role] ?? [] : [];
  const needsDocuments = requiredDocuments.length > 0;
  const [uploadedDocuments, setUploadedDocuments] = useState<Set<DocumentType>>(new Set());
  const [uploadingType, setUploadingType] = useState<DocumentType | null>(null);
  const [documentErrors, setDocumentErrors] = useState<Partial<Record<DocumentType, string>>>({});

  const allDocumentsUploaded = requiredDocuments.every((type) => uploadedDocuments.has(type));
  const canContinue = avatarUploaded && (!needsDocuments || allDocumentsUploaded);

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

  async function handleDocumentSelect(documentType: DocumentType, file: File) {
    if (!token) return;
    setDocumentErrors((prev) => ({ ...prev, [documentType]: undefined }));
    setUploadingType(documentType);
    try {
      await api.uploads.documents(token, file, documentType);
      setUploadedDocuments((prev) => new Set(prev).add(documentType));
    } catch (err) {
      setDocumentErrors((prev) => ({
        ...prev,
        [documentType]: err instanceof ApiError ? err.message : "Could not upload document.",
      }));
    } finally {
      setUploadingType(null);
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
              <StepHeader done={allDocumentsUploaded} index={2} label="Verification Documents" required />
              <p className="text-sm text-ur-text-secondary">
                Upload each required document below. An admin will review them before your account is fully verified.
              </p>
              <div className="space-y-3">
                {requiredDocuments.map((documentType) => (
                  <DocumentUploadRow
                    key={documentType}
                    documentType={documentType}
                    uploaded={uploadedDocuments.has(documentType)}
                    uploading={uploadingType === documentType}
                    error={documentErrors[documentType]}
                    onSelect={(file) => handleDocumentSelect(documentType, file)}
                  />
                ))}
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

function DocumentUploadRow({
  documentType,
  uploaded,
  uploading,
  error,
  onSelect,
}: {
  documentType: DocumentType;
  uploaded: boolean;
  uploading: boolean;
  error?: string;
  onSelect: (file: File) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-ur border border-ur-border bg-ur-card-soft p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-semibold text-ur-navy">
          <span
            className={`grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs ${
              uploaded ? "bg-ur-primary text-white" : "border border-ur-border-strong text-ur-text-muted"
            }`}
          >
            {uploaded ? <Icon name="check" size={12} /> : null}
          </span>
          {DOCUMENT_TYPE_LABELS[documentType]}
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,application/pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onSelect(file);
          }}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          <Icon name="description" size={14} />
          {uploading ? "Uploading..." : uploaded ? "Replace" : "Upload"}
        </Button>
      </div>
      {error ? <p className="mt-2 text-xs text-ur-error">{error}</p> : null}
    </div>
  );
}
