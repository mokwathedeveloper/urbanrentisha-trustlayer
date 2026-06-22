-- AlterTable
ALTER TABLE "AgentProfile" ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "activationCodeExpiresAt" TIMESTAMP(3),
ADD COLUMN     "activationCodeHash" TEXT,
ADD COLUMN     "attestationTxHash" TEXT,
ADD COLUMN     "attestedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "ManagerProfile" ADD COLUMN     "activatedAt" TIMESTAMP(3),
ADD COLUMN     "activationCodeExpiresAt" TIMESTAMP(3),
ADD COLUMN     "activationCodeHash" TEXT,
ADD COLUMN     "attestationTxHash" TEXT,
ADD COLUMN     "attestedAt" TIMESTAMP(3);
