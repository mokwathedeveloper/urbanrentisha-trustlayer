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
    id: string;
    agencyName: string;
    trustScore: number;
    verificationStatus: string;
    user: { name: string; email: string; phone: string | null };
  };
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  tenantId: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: string;
  createdAt: string;
  listing?: Listing;
  payment?: Payment | null;
  zkProof?: ZkProof | null;
  proofVerification?: ProofVerification | null;
  viewingCode?: ViewingCode | null;
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
  paidAt: string | null;
}

export interface ZkProof {
  id: string;
  viewingRequestId: string;
  proofHash: string | null;
  status: string;
  generatedAt: string | null;
  publicInputs?: {
    requestId: string;
    listingId: string;
    requiredViewingFee: string;
    paymentCommitment: string;
  } | null;
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
  expiresAt: string;
}

export interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  viewingRequestId: string | null;
  readAt: string | null;
  createdAt: string;
  viewingRequest?: ViewingRequest | null;
}

export interface ReportItem {
  id: string;
  listingId: string | null;
  viewingRequestId: string | null;
  reportType: string;
  description: string;
  status: string;
  severity: string;
  allowContact: boolean;
  createdAt: string;
  listing?: Listing | null;
}

export interface AgentProfile {
  id: string;
  agencyName: string | null;
  licenseNumber: string | null;
  verificationStatus: string;
  trustScore: number;
  reportCount: number;
  createdAt: string;
  user: { id: string; name: string; email: string; phone: string | null; createdAt: string };
  stats: {
    totalListings: number;
    activeListings: number;
    inactiveListings: number;
    openReports: number;
    resolvedReports: number;
    completedViewings: number;
  };
  listings: Listing[];
  recentViewingRequests: {
    id: string;
    tenantName: string;
    listingTitle: string;
    updatedAt: string;
    status: string;
  }[];
}

export interface AgentDashboard {
  id: string;
  agencyName: string | null;
  verificationStatus: string;
  trustScore: number;
  listings: Listing[];
  stats: {
    totalListings: number;
    activeListings: number;
    inactiveListings: number;
    totalViewingRequests: number;
    verifiedTenants: number;
    escrowHolds: number;
    activeViewingCodes: number;
    openReports: number;
    resolvedReports: number;
  };
  viewingRequests: {
    id: string;
    tenantName: string;
    listingTitle: string;
    status: string;
    preferredDate: string | null;
    createdAt: string;
  }[];
  verifiedTenants: { name: string; email: string; phone: string | null; status: string }[];
  escrowHolds: { id: string; listingTitle: string; amount: number; currency: string; paymentId: string }[];
  activeViewingCodes: { id: string; listingTitle: string; code: string; expiresAt: string | null }[];
  reports: { id: string; listingTitle: string; reportType: string; status: string; createdAt: string }[];
}

export interface AdminOverview {
  stats: {
    pendingListings: number;
    verifiedListings: number;
    totalReports: number;
    openReports: number;
    inProgressReports: number;
    resolvedReports: number;
    dismissedReports: number;
    totalAgents: number;
    verifiedAgents: number;
    pendingAgents: number;
    verifiedProofs: number;
    pendingProofs: number;
    escrowHoldsCount: number;
    escrowHoldsAmount: number;
    activeViewingCodes: number;
    platformTrustScore: number;
  };
  platformAnalytics: {
    totalUsers: number;
    totalProperties: number;
    totalBookings: number;
    totalRevenue: number;
  };
  pendingApprovals: {
    listings: { id: string; title: string; agencyName: string; createdAt: string }[];
    agents: { id: string; name: string; email: string; createdAt: string }[];
  };
  reportsByStatus: { OPEN: number; UNDER_REVIEW: number; RESOLVED: number; DISMISSED: number };
  topReportCategories: { type: string; count: number }[];
  activeAgents: {
    id: string;
    agencyName: string;
    listingCount: number;
    verificationStatus: string;
    trustScore: number;
  }[];
  recentProofVerifications: { id: string; listingTitle: string; status: string; createdAt: string }[];
  suspiciousActivity: { type: string; severity: "high" | "medium"; message: string }[];
  recentAuditLogs: { id: string; action: string; actorName: string; severity: string; createdAt: string }[];
}

export interface AuditLogEntry {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  severity: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
  actor: { id: string; email: string; name: string; role: string } | null;
}

export interface AuditLogStats {
  totalEvents: number;
  systemEvents: number;
  trustActivity: number;
  userActions: number;
  securityEvents: number;
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
    findMine: (token: string) => request<ViewingRequest[]>("/viewing-requests", { token }),
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
      body: {
        listingId?: string;
        viewingRequestId?: string;
        reportType: string;
        description: string;
        severity?: "high" | "medium" | "low";
        allowContact?: boolean;
      },
    ) => request<ReportItem>("/reports", { method: "POST", body, token }),
    findAll: (token: string) => request<ReportItem[]>("/reports", { token }),
    findMine: (token: string) => request<ReportItem[]>("/reports/mine", { token }),
  },
  notifications: {
    findMine: (token: string) => request<NotificationItem[]>("/notifications", { token }),
    markRead: (token: string, id: string) =>
      request<NotificationItem>(`/notifications/${id}/read`, { method: "PATCH", token }),
  },
  auditLogs: {
    findAll: (token: string) => request<AuditLogEntry[]>("/audit-logs", { token }),
    stats: (token: string) => request<AuditLogStats>("/audit-logs/stats", { token }),
  },
  admin: {
    dashboard: (token: string) => request<Record<string, number>>("/admin/dashboard", { token }),
    overview: (token: string) => request<AdminOverview>("/admin/overview", { token }),
  },
  agents: {
    findOne: (token: string, id: string) => request<AgentProfile>(`/agents/${id}`, { token }),
    myDashboard: (token: string) => request<AgentDashboard>("/agents/me/dashboard", { token }),
  },
};
