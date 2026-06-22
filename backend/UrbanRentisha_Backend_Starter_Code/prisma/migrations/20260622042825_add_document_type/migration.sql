-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('ID_CARD', 'GOOD_CONDUCT', 'PERSONAL_DOCUMENT', 'ASSET_DOCUMENT');

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "documentType" "DocumentType";
