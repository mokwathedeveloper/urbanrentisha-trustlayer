"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { ApiError, api } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewListingPage() {
  const { token, user } = useAuth();
  const router = useRouter();
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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAllowed = user?.role === "AGENT" || user?.role === "MANAGER" || user?.role === "ADMIN";

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
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
      });
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
        <Building2 className="h-6 w-6 text-ur-primary" />
        <h1 className="text-2xl font-black tracking-[-0.02em] text-ur-navy">List a Property</h1>
      </div>
      <p className="mt-1 text-sm text-ur-text-secondary">
        New listings are submitted for admin verification before going live.
      </p>

      <form onSubmit={handleSubmit} className="ur-card mt-6 max-w-2xl space-y-4 p-6">
        <Input label="Title" name="title" value={form.title} onChange={(e) => update("title", e.target.value)} required />

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
          <Input label="Location" name="location" value={form.location} onChange={(e) => update("location", e.target.value)} required />
          <Input label="Address (optional)" name="address" value={form.address} onChange={(e) => update("address", e.target.value)} />
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
          <Input label="Bedrooms" name="bedrooms" type="number" min={0} value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} />
          <Input label="Bathrooms" name="bathrooms" type="number" min={0} value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} />
        </div>

        {error ? <p className="text-sm text-ur-error">{error}</p> : null}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit for Verification"}
        </Button>
      </form>
    </div>
  );
}
