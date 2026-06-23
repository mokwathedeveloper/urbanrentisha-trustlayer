-- AlterEnum
ALTER TYPE "ViewingRequestStatus" ADD VALUE 'QUEUED';

-- AlterTable
ALTER TABLE "ViewingRequest" ADD COLUMN     "turnExpiresAt" TIMESTAMP(3);

