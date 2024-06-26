-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "idDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Skill" ADD COLUMN     "idDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "idDeleted" BOOLEAN NOT NULL DEFAULT false;
