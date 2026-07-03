-- AlterTable
ALTER TABLE "account" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "account" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "account" ADD COLUMN "deletedBy" TEXT;
ALTER TABLE "account" ADD COLUMN "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "session" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "session" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "session" ADD COLUMN "deletedBy" TEXT;
ALTER TABLE "session" ADD COLUMN "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "user" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "user" ADD COLUMN "deletedBy" TEXT;
ALTER TABLE "user" ADD COLUMN "updatedBy" TEXT;

-- AlterTable
ALTER TABLE "verification" ADD COLUMN "createdBy" TEXT;
ALTER TABLE "verification" ADD COLUMN "deletedAt" DATETIME;
ALTER TABLE "verification" ADD COLUMN "deletedBy" TEXT;
ALTER TABLE "verification" ADD COLUMN "updatedBy" TEXT;
