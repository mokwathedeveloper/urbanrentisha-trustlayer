-- CreateEnum
CREATE TYPE "ListingAvailability" AS ENUM ('AVAILABLE', 'RESERVED', 'RENTED');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "availabilityStatus" "ListingAvailability" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "reservationExpiresAt" TIMESTAMP(3),
ADD COLUMN     "reservedByRequestId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Listing_reservedByRequestId_key" ON "Listing"("reservedByRequestId");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_reservedByRequestId_fkey" FOREIGN KEY ("reservedByRequestId") REFERENCES "ViewingRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
