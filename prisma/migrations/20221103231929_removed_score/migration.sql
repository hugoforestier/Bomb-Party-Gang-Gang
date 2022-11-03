/*
  Warnings:

  - You are about to drop the `score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "score" DROP CONSTRAINT "score_u_id_fkey";

-- DropTable
DROP TABLE "score";
