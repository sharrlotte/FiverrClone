/*
  Warnings:

  - The values [Hour,Day,Week,Month,Year] on the enum `DurationType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Pending,Accepted,Rejected,Cancelled,Finished] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DurationType_new" AS ENUM ('HOUR', 'DAY');
ALTER TABLE "Package" ALTER COLUMN "durationType" DROP DEFAULT;
ALTER TABLE "Package" ALTER COLUMN "durationType" TYPE "DurationType_new" USING ("durationType"::text::"DurationType_new");
ALTER TYPE "DurationType" RENAME TO "DurationType_old";
ALTER TYPE "DurationType_new" RENAME TO "DurationType";
DROP TYPE "DurationType_old";
ALTER TABLE "Package" ALTER COLUMN "durationType" SET DEFAULT 'HOUR';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'FINISHED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Package" ALTER COLUMN "durationType" SET DEFAULT 'HOUR';
