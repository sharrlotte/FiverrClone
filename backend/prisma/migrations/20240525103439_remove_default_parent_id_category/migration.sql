-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "parentId" DROP DEFAULT;
DROP SEQUENCE "Category_parentId_seq";
