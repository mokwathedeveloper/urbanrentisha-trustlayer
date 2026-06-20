const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000/api/v1";

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown; token?: string | null } = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(payload.message ?? "Request failed.", res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export type UserRole = "TENANT" | "AGENT" | "MANAGER" | "ADMIN" | "PLATFORM";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: string;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  location: string;
  address: string | null;
  rentAmount: number;
  currency: string;
  viewingFee: number;
  bedrooms: number | null;
  bathrooms: number | null;
  propertyType: string;
  imageUrl: string | null;
  verificationStatus: string;
  agent?: {
    agencyName: string;
    trustScore: number;
    verificationStatus: string;
    user: { name: string; email: string };
  };
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  tenantId: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: string;
  listing?: Listing;
}

export interface Payment {
  id: string;
  viewingRequestId: string;
  amount: number;
  currency: string;
  stellarAsset: string;
  destinationWallet: string;
  payerWallet: string | null;
  stellarMemo: string;
  txHash: string | null;
  status: string;
}

export interface ZkProof {
  id: string;
  viewingRequestId: string;
  proofHash: string | null;
  status: string;
  generatedAt: string | null;
}

export interface ProofVerification {
  id: string;
  viewingRequestId: string;
  proofId: string | null;
  sorobanTxHash: string | null;
  verifierAddress: string | null;
  status: string;
  verifiedAt: string | null;
}

export interface ViewingCode {
  id: string;
  code: string;
  status: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  severity: string;
  metadata: unknown;
  createdAt: string;
}

export const api = {
  auth: {
    register: (body: { email: string; name: string; password: string; role: UserRole; phone?: string }) =>
      request<AuthResponse>("/auth/register", { method: "POST", body }),
    login: (body: { email: string; password: string }) =>
      request<AuthResponse>("/auth/login", { method: "POST", body }),
    me: (token: string) => request<AuthUser>("/auth/me", { token }),
  },
  listings: {
    findAll: () => request<Listing[]>("/listings"),
    findOne: (id: string) => request<Listing>(`/listings/${id}`),
  },
  viewingRequests: {
    create: (token: string, body: { listingId: string; preferredDate?: string; preferredTime?: string }) =>
      request<ViewingRequest>("/viewing-requests", { method: "POST", body, token }),
    findOne: (token: string, id: string) => request<ViewingRequest>(`/viewing-requests/${id}`, { token }),
    status: (token: string, id: string) => request<{ status: string }>(`/viewing-requests/${id}/status`, { token }),
  },
  payments: {
    create: (token: string, body: { viewingRequestId: string; payerWallet?: string }) =>
      request<Payment>("/payments/create", { method: "POST", body, token }),
    confirm: (token: string, body: { paymentId: string; txHash: string }) =>
      request<Payment>("/payments/confirm", { method: "POST", body, token }),
    findOne: (token: string, id: string) => request<Payment>(`/payments/${id}`, { token }),
  },
  zkProofs: {
    generate: (token: string, body: { viewingRequestId: string }) =>
      request<ZkProof>("/zk-proofs/generate", { method: "POST", body, token }),
    findOne: (token: string, id: string) => request<ZkProof>(`/zk-proofs/${id}`, { token }),
  },
  proofVerification: {
    submit: (token: string, body: { viewingRequestId: string }) =>
      request<ProofVerification>("/proof-verification/submit", { method: "POST", body, token }),
    findOne: (token: string, id: string) => request<ProofVerification>(`/proof-verification/${id}`, { token }),
  },
  viewingCodes: {
    generate: (token: string, body: { viewingRequestId: string }) =>
      request<ViewingCode>("/viewing-codes/generate", { method: "POST", body, token }),
    verify: (code: string) => request<{ valid: boolean; status: string }>(`/viewing-codes/${code}/verify`),
  },
  reports: {
    create: (
      token: string,
      body: { listingId?: string; viewingRequestId?: string; reportType: string; description: string },
    ) => request("/reports", { method: "POST", body, token }),
    findAll: (token: string) => request<unknown[]>("/reports", { token }),
  },
  notifications: {
    findMine: (token: string) => request<NotificationItem[]>("/notifications", { token }),
    markRead: (token: string, id: string) =>
      request<NotificationItem>(`/notifications/${id}/read`, { method: "PATCH", token }),
  },
  auditLogs: {
    findAll: (token: string) => request<AuditLogEntry[]>("/audit-logs", { token }),
  },
  admin: {
    dashboard: (token: string) => request<Record<string, number>>("/admin/dashboard", { token }),
  },
};
