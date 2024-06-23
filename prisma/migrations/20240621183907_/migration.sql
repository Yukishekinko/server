/*
  Warnings:

  - The primary key for the `Photoset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `published` to the `Backstage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Photoset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Photoset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Photoset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Backstage` ADD COLUMN `published` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `Photoset` DROP PRIMARY KEY,
    ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Preset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `published` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
