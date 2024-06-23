-- DropForeignKey
ALTER TABLE `PortfolioPhoto` DROP FOREIGN KEY `PortfolioPhoto_portfolioId_fkey`;

-- AddForeignKey
ALTER TABLE `PortfolioPhoto` ADD CONSTRAINT `PortfolioPhoto_portfolioId_fkey` FOREIGN KEY (`portfolioId`) REFERENCES `Portfolio`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
