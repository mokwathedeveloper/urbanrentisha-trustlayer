-- CreateTable
CREATE TABLE "ReconciliationLock" (
    "id" TEXT NOT NULL,
    "lockedAt" TIMESTAMP(3),
    "lockedUntil" TIMESTAMP(3),

    CONSTRAINT "ReconciliationLock_pkey" PRIMARY KEY ("id")
);

-- Seed the single lock row the application's atomic claim always targets
-- by a fixed id - the app never creates this row itself, only claims it.
INSERT INTO "ReconciliationLock" ("id", "lockedAt", "lockedUntil")
VALUES ('reconciliation', NULL, NULL)
ON CONFLICT ("id") DO NOTHING;
