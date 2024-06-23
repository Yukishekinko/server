/*
  Warnings:

  - You are about to drop the column `portfoliodId` on the `PortfolioPhoto` table. All the data in the column will be lost.
  - Added the required column `name` to the `Backstage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Backstage` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `PortfolioPhoto` DROP COLUMN `portfoliodId`;
