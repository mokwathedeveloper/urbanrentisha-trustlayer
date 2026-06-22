-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'RELEASED';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "escrowDepositTxHash" TEXT,
ADD COLUMN     "escrowReleaseTxHash" TEXT,
ADD COLUMN     "escrowReleasedAt" TIMESTAMP(3);
