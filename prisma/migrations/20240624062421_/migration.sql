/*
  Warnings:

  - The primary key for the `Backstage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `published` on the `Backstage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Backstage` DROP PRIMARY KEY,
    DROP COLUMN `published`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `BackstagePhoto` (
    `id` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `backstageId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `BackstagePhoto` ADD CONSTRAINT `BackstagePhoto_backstageId_fkey` FOREIGN KEY (`backstageId`) REFERENCES `Backstage`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
