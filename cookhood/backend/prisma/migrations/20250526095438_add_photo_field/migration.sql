/*
  Warnings:

  - Added the required column `photo` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `offer` ADD COLUMN `photo` VARCHAR(191) NOT NULL;
