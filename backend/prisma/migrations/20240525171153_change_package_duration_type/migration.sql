/*
  Warnings:

  - The `deliveryTime` column on the `Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `durationType` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DurationType" AS ENUM ('Hour', 'Date', 'Week', 'Month', 'Year');

-- AlterTable
ALTER TABLE "Package" ADD COLUMN     "durationType" "DurationType" NOT NULL,
DROP COLUMN "deliveryTime",
ADD COLUMN     "deliveryTime" INTEGER;
