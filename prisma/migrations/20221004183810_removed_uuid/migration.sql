/*
  Warnings:

  - You are about to drop the column `u_uuid` on the `user` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "user_u_uuid_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "u_uuid";
