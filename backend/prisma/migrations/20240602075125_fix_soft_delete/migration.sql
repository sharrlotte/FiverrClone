/*
  Warnings:

  - You are about to drop the column `idDeleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `idDeleted` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `idDeleted` on the `Tag` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "idDeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "idDeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "idDeleted",
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
