/*
  Warnings:

  - You are about to drop the column `about` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "parentId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "about";
