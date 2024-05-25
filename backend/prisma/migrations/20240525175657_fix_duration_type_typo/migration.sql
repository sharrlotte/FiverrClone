/*
  Warnings:

  - The values [Date] on the enum `DurationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DurationType_new" AS ENUM ('Hour', 'Day', 'Week', 'Month', 'Year');
ALTER TABLE "Package" ALTER COLUMN "durationType" TYPE "DurationType_new" USING ("durationType"::text::"DurationType_new");
ALTER TYPE "DurationType" RENAME TO "DurationType_old";
ALTER TYPE "DurationType_new" RENAME TO "DurationType";
DROP TYPE "DurationType_old";
COMMIT;
