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

/**
 * Shared shape for every backend list endpoint that paginates (listings
 * browse/mine/saved, reports, notifications, viewing requests, viewing
 * request messages). These used to return a bare `T[]`; every caller must
 * read `.items` instead of treating the response itself as the array -
 * the return type changing from `T[]` to `PaginatedResponse<T>` below is
 * what makes TypeScript catch any call site that still assumes otherwise.
 */
export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

function withPaginationQuery(path: string, params?: PaginationParams): string {
  if (!params || (params.page === undefined && params.limit === undefined)) {
    return path;
  }
  const query = new URLSearchParams();
  if (params.page !== undefined) query.set("page", String(params.page));
  if (params.limit !== undefined) query.set("limit", String(params.limit));
  return `${path}?${query.toString()}`;
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

async function uploadRequest<T>(
  path: string,
  token: string | null,
  file: File,
  fields?: Record<string, string>,
): Promise<T> {
  const formData = new FormData();
  formData.append("file", file);
  if (fields) {
    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: formData,
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => ({ message: res.statusText }));
    throw new ApiError(payload.message ?? "Upload failed.", res.status);
  }

  return res.json() as Promise<T>;
}

export type UserRole = "TENANT" | "LANDLORD" | "AGENT" | "MANAGER" | "ADMIN" | "PLATFORM";

export type VerificationStage =
  | "PROFILE_CREATED"
  | "DOCUMENTS_UPLOADED"
  | "UNDER_REVIEW"
  | "NEEDS_CORRECTION"
  | "APPROVED"
  | "REJECTED";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  status: string;
  avatarUrl?: string | null;
  mustChangePassword?: boolean;
  walletAddress?: string | null;
}

export interface AuthResponse {
  user: AuthUser;
  accessToken: string;
  walletSecret?: string;
}

export interface TenantProfileSummary {
  id: string;
  trustScore: number;
  verificationStage: VerificationStage;
  verifiedBadge: boolean;
}

export interface LandlordProfileSummary {
  id: string;
  companyName: string | null;
  verificationStage: VerificationStage;
  trustScore: number;
}

export interface AgentLikeProfileSummary {
  id: string;
  agencyName: string | null;
  licenseNumber: string | null;
  verificationStatus: string;
  verificationStage: VerificationStage;
  trustScore: number;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: UserRole;
  status: string;
  avatarUrl: string | null;
  walletAddress: string | null;
  createdAt: string;
  tenantProfile: TenantProfileSummary | null;
  landlordProfile: LandlordProfileSummary | null;
  agentProfile: AgentLikeProfileSummary | null;
  managerProfile: AgentLikeProfileSummary | null;
}

export interface ListingImage {
  id: string;
  listingId: string;
  url: string;
  order: number;
  latitude: number | null;
  longitude: number | null;
  capturedAt: string | null;
  device: string | null;
  gpsPresent: boolean;
  createdAt: string;
}

export interface ListingContact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  lastActiveAt: string | null;
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
  images: ListingImage[];
  verificationStatus: string;
  availabilityStatus: "AVAILABLE" | "RESERVED" | "RENTED";
  reservedByRequestId: string | null;
  reservationExpiresAt: string | null;
  ownerId: string;
  agentId: string | null;
  managerId: string | null;
  owner: ListingContact;
  agent?: {
    id: string;
    agencyName: string;
    trustScore: number;
    verificationStatus: string;
    user: ListingContact;
  };
  manager?: {
    id: string;
    agencyName: string;
    trustScore: number;
    verificationStatus: string;
    user: ListingContact;
  };
  escrowPhase?: EscrowPhase | null;
}

export type EscrowPhaseCode =
  | "BOOKING_PENDING"
  | "PAYMENT_RECEIVED"
  | "ESCROW_FUNDED"
  | "RELEASED"
  | "REFUNDED"
  | "FAILED";

export interface EscrowPhase {
  phase: EscrowPhaseCode;
  label: string;
  isEscrow: boolean;
  tenantId: string;
  tenantName: string;
  amount: number;
  currency: string;
  paymentId: string | null;
}

export interface EscrowTimelineEntry {
  action: string;
  severity: string;
  metadata: unknown;
  createdAt: string;
}

export interface EscrowOverviewItem {
  paymentId: string;
  viewingRequestId: string;
  listingId: string;
  listingTitle: string;
  listingImageUrl: string | null;
  tenantId: string;
  tenantName: string;
  amount: number;
  currency: string;
  stellarAsset: string;
  status: string;
  isEscrow: boolean;
  escrowDepositTxHash: string | null;
  escrowReleaseTxHash: string | null;
  proofStatus: string | null;
  paidAt: string | null;
  escrowReleasedAt: string | null;
  createdAt: string;
  updatedAt: string;
  timeline: EscrowTimelineEntry[];
}

export interface EscrowSummary {
  currency: string;
  totalReceived: number;
  totalManaged: number;
  escrowHeldAmount: number;
  escrowHeldCount: number;
  pendingReleaseAmount: number;
  pendingReleaseCount: number;
  totalReleased: number;
  totalRefunded: number;
  completedTransactions: number;
  activePropertiesWithEscrow: number;
  activeBookings: number;
  completedBookings: number;
}

export interface ViewingRequest {
  id: string;
  listingId: string;
  tenantId: string;
  preferredDate: string | null;
  preferredTime: string | null;
  status: string;
  turnExpiresAt: string | null;
  createdAt: string;
  listing?: Listing;
  payment?: Payment | null;
  zkProof?: ZkProof | null;
  proofVerification?: ProofVerification | null;
  viewingCode?: ViewingCode | null;
}

export interface ViewingRequestStatusInfo {
  id: string;
  status: string;
  turnExpiresAt: string | null;
  queuePosition: number | null;
  paymentStatus: string;
  proofStatus: string;
  verificationStatus: string;
  viewingCodeStatus: string;
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
  listingId: string | null;
  readAt: string | null;
  createdAt: string;
  viewingRequest?: ViewingRequest | null;
  listing?: Listing | null;
}

export interface MessageThread {
  kind: "viewing_request" | "listing_thread" | "support";
  id: string;
  listingId: string | null;
  listingTitle: string;
  listingImageUrl: string | null;
  otherParty: string;
  otherPartyId: string;
  otherPartyLastActiveAt: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface MessageItem {
  id: string;
  viewingRequestId: string | null;
  listingThreadId: string | null;
  senderId: string;
  body: string;
  readAt: string | null;
  createdAt: string;
  sender: { id: string; name: string; role: string };
}

export interface ListingThread {
  id: string;
  listingId: string;
  tenantId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  targetUserId: string;
  reviewerId: string;
  rating: number;
  comment: string | null;
  listingId: string | null;
  createdAt: string;
  reviewer: { id: string; name: string };
}

export interface ReviewSummary {
  reviews: Review[];
  average: number;
  count: number;
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
  firstRespondedAt: string | null;
  respondedById: string | null;
  responseNote: string | null;
  responseDeadline: string;
  createdAt: string;
  listing?: Listing | null;
  reporter?: { id: string; email: string; name: string; role: string };
  respondedBy?: { id: string; name: string } | null;
}

export interface AgentProfile {
  id: string;
  agencyName: string | null;
  licenseNumber: string | null;
  verificationStatus: string;
  trustScore: number;
  reportCount: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    createdAt: string;
    lastActiveAt: string | null;
  };
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
  verificationStage: VerificationStage;
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

export type ProfileType = "tenant" | "landlord" | "agent" | "manager";

export type DocumentType = "ID_CARD" | "GOOD_CONDUCT" | "PERSONAL_DOCUMENT" | "ASSET_DOCUMENT";

export interface VerificationItem {
  profileType: ProfileType;
  profileId: string;
  userId: string;
  name: string;
  email: string;
  userStatus: string;
  verificationStage: VerificationStage;
  linkedLandlordName: string | null;
  documents: {
    id: string;
    fileName: string;
    documentType: DocumentType | null;
    status: string;
    createdAt: string;
    signedUrl: string;
  }[];
  createdAt: string;
}

export interface LandlordTeamMember {
  id: string;
  profileType: "agent" | "manager";
  agencyName: string | null;
  verificationStatus: string;
  trustScore: number;
  user: { id: string; name: string; email: string; status: string };
  listings: { id: string; title: string; verificationStatus: string }[];
}

export interface LandlordTeam {
  id: string;
  companyName: string | null;
  verificationStage: VerificationStage;
  trustScore: number;
  user: { id: string; name: string; email: string; status: string };
  agents: LandlordTeamMember[];
  managers: LandlordTeamMember[];
}

export interface LandlordTeamSummaryMember {
  id: string;
  profileType: "agent" | "manager";
  agencyName: string | null;
  verificationStatus: string;
  activatedAt: string | null;
  attestationTxHash: string | null;
  user: { id: string; name: string; email: string; status: string };
}

export interface LandlordTeamSummary {
  agents: LandlordTeamSummaryMember[];
  managers: LandlordTeamSummaryMember[];
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

export interface SavedListingItem {
  id: string;
  userId: string;
  listingId: string;
  createdAt: string;
  listing: Listing;
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
    register: (body: {
      email: string;
      name: string;
      password: string;
      role: UserRole;
      phone?: string;
    }) => request<AuthResponse>("/auth/register", { method: "POST", body }),
    login: (body: { email: string; password: string }) =>
      request<AuthResponse>("/auth/login", { method: "POST", body }),
    me: (token: string) => request<AuthUser>("/auth/me", { token }),
  },
  users: {
    me: (token: string) => request<UserProfile>("/users/me", { token }),
    updateProfile: (token: string, body: { name?: string; phone?: string; walletAddress?: string }) =>
      request<UserProfile>("/users/me", { method: "PATCH", body, token }),
    changePassword: (token: string, body: { currentPassword?: string; newPassword: string }) =>
      request<{ success: boolean }>("/users/me/password", { method: "PATCH", body, token }),
    generateWallet: (token: string) =>
      request<{ publicKey: string; secretKey: string }>("/users/me/wallet/generate", { method: "POST", token }),
  },
  listings: {
    findAll: (params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<Listing>>(withPaginationQuery("/listings", params)),
    findOne: (id: string) => request<Listing>(`/listings/${id}`),
    findSaved: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<SavedListingItem>>(withPaginationQuery("/listings/saved", params), { token }),
    findMine: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<Listing>>(withPaginationQuery("/listings/mine", params), { token }),
    save: (token: string, id: string) => request<SavedListingItem>(`/listings/${id}/save`, { method: "POST", token }),
    unsave: (token: string, id: string) =>
      request<{ success: boolean }>(`/listings/${id}/save`, { method: "DELETE", token }),
    create: (
      token: string,
      body: {
        title: string;
        description: string;
        location: string;
        address?: string;
        rentAmount: number;
        currency?: string;
        viewingFee: number;
        propertyType: string;
        bedrooms?: number;
        bathrooms?: number;
        imageUrl?: string;
      },
    ) => request<Listing>("/listings", { method: "POST", body, token }),
    verify: (token: string, id: string) =>
      request<Listing>(`/listings/${id}/verify`, { method: "PATCH", token }),
    reject: (token: string, id: string, note?: string) =>
      request<Listing>(`/listings/${id}/reject`, { method: "PATCH", body: { note }, token }),
    addImage: (
      token: string,
      listingId: string,
      body: {
        url: string;
        latitude: number;
        longitude: number;
        capturedAt?: string;
        device?: string;
        gpsPresent: true;
      },
    ) => request<ListingImage>(`/listings/${listingId}/images`, { method: "POST", body, token }),
    deleteImage: (token: string, listingId: string, imageId: string) =>
      request<{ success: boolean }>(`/listings/${listingId}/images/${imageId}`, {
        method: "DELETE",
        token,
      }),
    markRented: (token: string, id: string) =>
      request<Listing>(`/listings/${id}/mark-rented`, { method: "POST", token }),
    releaseReservation: (token: string, id: string) =>
      request<Listing>(`/listings/${id}/release-reservation`, { method: "POST", token }),
    escrowPhase: (token: string, id: string) =>
      request<EscrowPhase | null>(`/listings/${id}/escrow`, { token }),
  },
  viewingRequests: {
    create: (token: string, body: { listingId: string; preferredDate?: string; preferredTime?: string }) =>
      request<ViewingRequest>("/viewing-requests", { method: "POST", body, token }),
    findMine: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<ViewingRequest>>(withPaginationQuery("/viewing-requests", params), { token }),
    findOne: (token: string, id: string) => request<ViewingRequest>(`/viewing-requests/${id}`, { token }),
    status: (token: string, id: string) =>
      request<ViewingRequestStatusInfo>(`/viewing-requests/${id}/status`, { token }),
    escrowSummary: (token: string) =>
      request<EscrowSummary>("/viewing-requests/escrow-summary", { token }),
  },
  payments: {
    create: (token: string, body: { viewingRequestId: string; payerWallet?: string }) =>
      request<Payment>("/payments/create", { method: "POST", body, token }),
    confirm: (token: string, body: { paymentId: string; txHash: string }) =>
      request<Payment>("/payments/confirm", { method: "POST", body, token }),
    findOne: (token: string, id: string) => request<Payment>(`/payments/${id}`, { token }),
    pollStatus: (token: string, id: string) => request<Payment>(`/payments/${id}/poll`, { token }),
    payNow: (token: string, id: string) =>
      request<Payment>(`/payments/${id}/pay-now`, { method: "POST", token }),
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
        severity?: "HIGH" | "MEDIUM" | "LOW";
        allowContact?: boolean;
      },
    ) => request<ReportItem>("/reports", { method: "POST", body, token }),
    findAll: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<ReportItem>>(withPaginationQuery("/reports", params), { token }),
    findMine: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<ReportItem>>(withPaginationQuery("/reports/mine", params), { token }),
    respond: (token: string, id: string, body: { status: string; note?: string }) =>
      request<ReportItem>(`/reports/${id}/respond`, { method: "PATCH", body, token }),
  },
  notifications: {
    findMine: (token: string, params: PaginationParams = { limit: 100 }) =>
      request<PaginatedResponse<NotificationItem>>(withPaginationQuery("/notifications", params), { token }),
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
    verifications: {
      list: (token: string) => request<VerificationItem[]>("/admin/verifications", { token }),
      review: (
        token: string,
        profileType: ProfileType,
        profileId: string,
        body: { decision: "APPROVED" | "REJECTED" | "NEEDS_CORRECTION"; note?: string },
      ) =>
        request<unknown>(`/admin/verifications/${profileType}/${profileId}/review`, {
          method: "PATCH",
          body,
          token,
        }),
    },
    users: {
      setStatus: (token: string, userId: string, status: "ACTIVE" | "SUSPENDED") =>
        request<{ id: string; status: string }>(`/admin/users/${userId}/status`, {
          method: "PATCH",
          body: { status },
          token,
        }),
    },
    agents: {
      setLandlord: (
        token: string,
        profileType: "agent" | "manager",
        profileId: string,
        landlordProfileId: string | null,
      ) =>
        request<unknown>(`/admin/agents/${profileType}/${profileId}/landlord`, {
          method: "PATCH",
          body: { landlordProfileId },
          token,
        }),
    },
    landlords: {
      list: (token: string) =>
        request<{ id: string; companyName: string | null; name: string; email: string }[]>(
          "/admin/landlords",
          { token },
        ),
      getTeam: (token: string, landlordProfileId: string) =>
        request<LandlordTeam>(`/admin/landlords/${landlordProfileId}/team`, { token }),
    },
  },
  agents: {
    findOne: (token: string, id: string) => request<AgentProfile>(`/agents/${id}`, { token }),
    myDashboard: (token: string) => request<AgentDashboard>("/agents/me/dashboard", { token }),
    escrowOverview: (token: string) =>
      request<EscrowOverviewItem[]>("/agents/me/escrow", { token }),
    escrowSummary: (token: string) =>
      request<EscrowSummary>("/agents/me/escrow/summary", { token }),
  },
  landlord: {
    escrowOverview: (token: string) =>
      request<EscrowOverviewItem[]>("/landlord/escrow", { token }),
    escrowSummary: (token: string) =>
      request<EscrowSummary>("/landlord/escrow/summary", { token }),
    getTeam: (token: string) => request<LandlordTeamSummary>("/landlord/team", { token }),
    inviteAgent: (
      token: string,
      body: { name: string; email: string; role: "AGENT" | "MANAGER" },
      file: File,
    ) =>
      uploadRequest<{ message: string; profileId: string }>(
        "/landlord/agents",
        token,
        file,
        { name: body.name, email: body.email, role: body.role },
      ),
    generateActivationCode: (token: string, profileType: "agent" | "manager", profileId: string) =>
      request<{ activationCode: string; expiresAt: string }>(
        `/landlord/agents/${profileType}/${profileId}/activation-code`,
        { method: "POST", token },
      ),
    activate: (
      body: { email: string; activationCode: string; newPassword: string },
      file: File,
    ) =>
      uploadRequest<{ success: boolean; walletSecret?: string }>(
        "/landlord/agents/activate",
        null,
        file,
        body,
      ),
  },
  messages: {
    findInbox: (token: string) => request<MessageThread[]>("/messages", { token }),
    findForRequest: (
      token: string,
      viewingRequestId: string,
      params: PaginationParams = { limit: 100 },
    ) =>
      request<PaginatedResponse<MessageItem>>(
        withPaginationQuery(`/viewing-requests/${viewingRequestId}/messages`, params),
        { token },
      ),
    send: (token: string, viewingRequestId: string, body: string) =>
      request<MessageItem>(`/viewing-requests/${viewingRequestId}/messages`, {
        method: "POST",
        body: { body },
        token,
      }),
    markRead: (token: string, viewingRequestId: string) =>
      request<{ updated: number }>(`/viewing-requests/${viewingRequestId}/messages/read`, {
        method: "PATCH",
        token,
      }),
  },
  listingThreads: {
    getOrCreate: (token: string, listingId: string) =>
      request<ListingThread>(`/listings/${listingId}/thread`, { method: "POST", token }),
    findMessages: (token: string, threadId: string) =>
      request<MessageItem[]>(`/listing-threads/${threadId}/messages`, { token }),
    send: (token: string, threadId: string, body: string) =>
      request<MessageItem>(`/listing-threads/${threadId}/messages`, {
        method: "POST",
        body: { body },
        token,
      }),
    markRead: (token: string, threadId: string) =>
      request<{ updated: number }>(`/listing-threads/${threadId}/messages/read`, {
        method: "PATCH",
        token,
      }),
  },
  support: {
    getOrCreateMyThread: (token: string) =>
      request<{ id: string }>("/support/thread", { method: "POST", token }),
    findMessages: (token: string, threadId: string) =>
      request<MessageItem[]>(`/support/threads/${threadId}/messages`, { token }),
    send: (token: string, threadId: string, body: string) =>
      request<MessageItem>(`/support/threads/${threadId}/messages`, {
        method: "POST",
        body: { body },
        token,
      }),
    markRead: (token: string, threadId: string) =>
      request<{ updated: number }>(`/support/threads/${threadId}/messages/read`, {
        method: "PATCH",
        token,
      }),
  },
  reviews: {
    create: (
      token: string,
      targetUserId: string,
      body: { rating: number; comment?: string; listingId?: string },
    ) => request<Review>(`/users/${targetUserId}/reviews`, { method: "POST", body, token }),
    findForUser: (targetUserId: string) =>
      request<ReviewSummary>(`/users/${targetUserId}/reviews`),
  },
  uploads: {
    avatar: (token: string, file: File) =>
      uploadRequest<{ avatarUrl: string }>("/uploads/avatar", token, file),
    listingImage: (token: string, file: File) =>
      uploadRequest<{ imageUrl: string }>("/uploads/listing-image", token, file),
    documents: (token: string, file: File, documentType: DocumentType) =>
      uploadRequest<{ id: string; fileUrl: string; fileName: string; documentType: DocumentType; status: string }>(
        "/uploads/documents",
        token,
        file,
        { documentType },
      ),
  },
};
