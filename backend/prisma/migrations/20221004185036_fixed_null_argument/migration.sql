/*
  Warnings:

  - Made the column `u_id` on table `score` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_u_id_fkey";

-- AlterTable
ALTER TABLE "score" ALTER COLUMN "u_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "user"("u_id") ON DELETE RESTRICT ON UPDATE CASCADE;
