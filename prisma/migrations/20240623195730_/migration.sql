/*
  Warnings:

  - Added the required column `description` to the `Preset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `file` to the `Preset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Preset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original` to the `Preset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Preset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Preset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Preset` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `file` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `original` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `result` VARCHAR(191) NOT NULL;
