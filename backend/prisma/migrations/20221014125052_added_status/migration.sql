/*
  Warnings:

  - Added the required column `u_status` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "u_status" BOOLEAN NOT NULL;
