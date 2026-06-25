-- CreateEnum
CREATE TYPE "ReportSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "AgentVerificationStatus" AS ENUM ('PENDING', 'VERIFIED');

-- AlterTable: AgentProfile.verificationStatus (String -> enum), preserving
-- existing data via an explicit backfill instead of a naive drop+recreate,
-- which would have reset every existing row to the column default.
ALTER TABLE "AgentProfile" ADD COLUMN "verificationStatus_new" "AgentVerificationStatus";
UPDATE "AgentProfile" SET "verificationStatus_new" = UPPER("verificationStatus")::"AgentVerificationStatus";
ALTER TABLE "AgentProfile" ALTER COLUMN "verificationStatus_new" SET NOT NULL;
ALTER TABLE "AgentProfile" ALTER COLUMN "verificationStatus_new" SET DEFAULT 'PENDING';
ALTER TABLE "AgentProfile" DROP COLUMN "verificationStatus";
ALTER TABLE "AgentProfile" RENAME COLUMN "verificationStatus_new" TO "verificationStatus";

-- AlterTable: ManagerProfile.verificationStatus (String -> enum), same
-- preserve-existing-data approach as AgentProfile above.
ALTER TABLE "ManagerProfile" ADD COLUMN "verificationStatus_new" "AgentVerificationStatus";
UPDATE "ManagerProfile" SET "verificationStatus_new" = UPPER("verificationStatus")::"AgentVerificationStatus";
ALTER TABLE "ManagerProfile" ALTER COLUMN "verificationStatus_new" SET NOT NULL;
ALTER TABLE "ManagerProfile" ALTER COLUMN "verificationStatus_new" SET DEFAULT 'PENDING';
ALTER TABLE "ManagerProfile" DROP COLUMN "verificationStatus";
ALTER TABLE "ManagerProfile" RENAME COLUMN "verificationStatus_new" TO "verificationStatus";

-- AlterTable: Report.severity (String -> enum), same preserve-existing-data
-- approach.
ALTER TABLE "Report" ADD COLUMN "severity_new" "ReportSeverity";
UPDATE "Report" SET "severity_new" = UPPER("severity")::"ReportSeverity";
ALTER TABLE "Report" ALTER COLUMN "severity_new" SET NOT NULL;
ALTER TABLE "Report" ALTER COLUMN "severity_new" SET DEFAULT 'MEDIUM';
ALTER TABLE "Report" DROP COLUMN "severity";
ALTER TABLE "Report" RENAME COLUMN "severity_new" TO "severity";

-- CreateIndex
CREATE INDEX "AgentProfile_landlordId_idx" ON "AgentProfile"("landlordId");

-- CreateIndex
CREATE INDEX "AgentProfile_verificationStatus_idx" ON "AgentProfile"("verificationStatus");

-- CreateIndex
CREATE UNIQUE INDEX "ApiClient_apiKeyHash_key" ON "ApiClient"("apiKeyHash");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_idx" ON "AuditLog"("actorId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "Document_uploaderId_idx" ON "Document"("uploaderId");

-- CreateIndex
CREATE INDEX "Document_tenantProfileId_idx" ON "Document"("tenantProfileId");

-- CreateIndex
CREATE INDEX "Document_landlordProfileId_idx" ON "Document"("landlordProfileId");

-- CreateIndex
CREATE INDEX "Document_agentProfileId_idx" ON "Document"("agentProfileId");

-- CreateIndex
CREATE INDEX "Document_managerProfileId_idx" ON "Document"("managerProfileId");

-- CreateIndex
CREATE INDEX "Document_reviewedById_idx" ON "Document"("reviewedById");

-- CreateIndex
CREATE INDEX "Listing_ownerId_idx" ON "Listing"("ownerId");

-- CreateIndex
CREATE INDEX "Listing_agentId_idx" ON "Listing"("agentId");

-- CreateIndex
CREATE INDEX "Listing_managerId_idx" ON "Listing"("managerId");

-- CreateIndex
CREATE INDEX "Listing_verificationStatus_idx" ON "Listing"("verificationStatus");

-- CreateIndex
CREATE INDEX "Listing_availabilityStatus_idx" ON "Listing"("availabilityStatus");

-- CreateIndex
CREATE INDEX "ListingImage_listingId_idx" ON "ListingImage"("listingId");

-- CreateIndex
CREATE INDEX "ManagerProfile_landlordId_idx" ON "ManagerProfile"("landlordId");

-- CreateIndex
CREATE INDEX "ManagerProfile_verificationStatus_idx" ON "ManagerProfile"("verificationStatus");

-- CreateIndex
CREATE INDEX "Message_viewingRequestId_idx" ON "Message"("viewingRequestId");

-- CreateIndex
CREATE INDEX "Message_listingThreadId_idx" ON "Message"("listingThreadId");

-- CreateIndex
CREATE INDEX "Message_supportThreadId_idx" ON "Message"("supportThreadId");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Notification_userId_readAt_idx" ON "Notification"("userId", "readAt");

-- CreateIndex
CREATE INDEX "Notification_viewingRequestId_idx" ON "Notification"("viewingRequestId");

-- CreateIndex
CREATE INDEX "Notification_listingId_idx" ON "Notification"("listingId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "Payment"("status");

-- CreateIndex
CREATE INDEX "ProofVerification_status_idx" ON "ProofVerification"("status");

-- CreateIndex
CREATE INDEX "Report_listingId_idx" ON "Report"("listingId");

-- CreateIndex
CREATE INDEX "Report_viewingRequestId_idx" ON "Report"("viewingRequestId");

-- CreateIndex
CREATE INDEX "Report_reporterId_idx" ON "Report"("reporterId");

-- CreateIndex
CREATE INDEX "Report_respondedById_idx" ON "Report"("respondedById");

-- CreateIndex
CREATE INDEX "Report_status_idx" ON "Report"("status");

-- CreateIndex
CREATE INDEX "Review_targetUserId_idx" ON "Review"("targetUserId");

-- CreateIndex
CREATE INDEX "Review_listingId_idx" ON "Review"("listingId");

-- CreateIndex
CREATE INDEX "SavedListing_listingId_idx" ON "SavedListing"("listingId");

-- CreateIndex
CREATE INDEX "SupportThread_assignedAdminId_idx" ON "SupportThread"("assignedAdminId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "ViewingRequest_listingId_idx" ON "ViewingRequest"("listingId");

-- CreateIndex
CREATE INDEX "ViewingRequest_tenantId_idx" ON "ViewingRequest"("tenantId");

-- CreateIndex
CREATE INDEX "ViewingRequest_status_idx" ON "ViewingRequest"("status");

-- CreateIndex
CREATE INDEX "WebhookEvent_apiClientId_idx" ON "WebhookEvent"("apiClientId");

-- CreateIndex
CREATE INDEX "ZkProof_status_idx" ON "ZkProof"("status");
