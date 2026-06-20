-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "viewingRequestId" TEXT;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_viewingRequestId_fkey" FOREIGN KEY ("viewingRequestId") REFERENCES "ViewingRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
