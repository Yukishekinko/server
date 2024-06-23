-- DropForeignKey
ALTER TABLE `Photo` DROP FOREIGN KEY `Photo_photosetId_fkey`;

-- AddForeignKey
ALTER TABLE `Photo` ADD CONSTRAINT `Photo_photosetId_fkey` FOREIGN KEY (`photosetId`) REFERENCES `Photoset`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
