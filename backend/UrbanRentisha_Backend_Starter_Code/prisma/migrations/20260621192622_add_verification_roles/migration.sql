-- CreateEnum
CREATE TYPE "VerificationStage" AS ENUM ('PROFILE_CREATED', 'DOCUMENTS_UPLOADED', 'UNDER_REVIEW', 'NEEDS_CORRECTION', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'NEEDS_CORRECTION');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'LANDLORD';

-- AlterTable
ALTER TABLE "AgentProfile" ADD COLUMN     "landlordId" TEXT,
ADD COLUMN     "verificationStage" "VerificationStage" NOT NULL DEFAULT 'PROFILE_CREATED';

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "managerId" TEXT;

-- AlterTable
ALTER TABLE "TenantProfile" ADD COLUMN     "verificationStage" "VerificationStage" NOT NULL DEFAULT 'PROFILE_CREATED',
ADD COLUMN     "verifiedBadge" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT;

-- CreateTable
CREATE TABLE "LandlordProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT,
    "verificationStage" "VerificationStage" NOT NULL DEFAULT 'PROFILE_CREATED',
    "trustScore" INTEGER NOT NULL DEFAULT 70,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LandlordProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagerProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "agencyName" TEXT,
    "licenseNumber" TEXT,
    "verificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "verificationStage" "VerificationStage" NOT NULL DEFAULT 'PROFILE_CREATED',
    "trustScore" INTEGER NOT NULL DEFAULT 70,
    "reportCount" INTEGER NOT NULL DEFAULT 0,
    "landlordId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "tenantProfileId" TEXT,
    "landlordProfileId" TEXT,
    "agentProfileId" TEXT,
    "managerProfileId" TEXT,
    "fileUrl" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "reviewNote" TEXT,
    "reviewedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LandlordProfile_userId_key" ON "LandlordProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ManagerProfile_userId_key" ON "ManagerProfile"("userId");

-- AddForeignKey
ALTER TABLE "LandlordProfile" ADD CONSTRAINT "LandlordProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AgentProfile" ADD CONSTRAINT "AgentProfile_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "LandlordProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerProfile" ADD CONSTRAINT "ManagerProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerProfile" ADD CONSTRAINT "ManagerProfile_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "LandlordProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_tenantProfileId_fkey" FOREIGN KEY ("tenantProfileId") REFERENCES "TenantProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_landlordProfileId_fkey" FOREIGN KEY ("landlordProfileId") REFERENCES "LandlordProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_agentProfileId_fkey" FOREIGN KEY ("agentProfileId") REFERENCES "AgentProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_managerProfileId_fkey" FOREIGN KEY ("managerProfileId") REFERENCES "ManagerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_reviewedById_fkey" FOREIGN KEY ("reviewedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "ManagerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- DataMigration: AgentProfile was previously shared by AGENT and MANAGER roles.
-- Move existing MANAGER-role profiles into the new ManagerProfile table, reusing the
-- same primary key so Listing.agentId values can be repointed to Listing.managerId directly.
INSERT INTO "ManagerProfile" (
  "id", "userId", "agencyName", "licenseNumber", "verificationStatus",
  "verificationStage", "trustScore", "reportCount", "landlordId", "createdAt", "updatedAt"
)
SELECT
  ap."id", ap."userId", ap."agencyName", ap."licenseNumber", ap."verificationStatus",
  ap."verificationStage", ap."trustScore", ap."reportCount", ap."landlordId", ap."createdAt", ap."updatedAt"
FROM "AgentProfile" ap
JOIN "User" u ON u."id" = ap."userId"
WHERE u."role" = 'MANAGER';

UPDATE "Listing"
SET "managerId" = "agentId", "agentId" = NULL
WHERE "agentId" IN (
  SELECT ap."id" FROM "AgentProfile" ap
  JOIN "User" u ON u."id" = ap."userId"
  WHERE u."role" = 'MANAGER'
);

DELETE FROM "AgentProfile" ap
USING "User" u
WHERE u."id" = ap."userId" AND u."role" = 'MANAGER';
