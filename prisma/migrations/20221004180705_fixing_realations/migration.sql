/*
  Warnings:

  - You are about to drop the column `u_uuid` on the `score` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "score_u_uuid_key";

-- AlterTable
ALTER TABLE "score" DROP COLUMN "u_uuid",
ADD COLUMN     "u_id" BIGINT;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_u_id_fkey" FOREIGN KEY ("u_id") REFERENCES "user"("u_id") ON DELETE SET NULL ON UPDATE CASCADE;
