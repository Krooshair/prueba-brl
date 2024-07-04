/*
  Warnings:

  - You are about to alter the column `createdAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `barCode` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `codeProduct` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `investment` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `priceOffer` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `quantityDrawer` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the `saleproduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `saleproduct` DROP FOREIGN KEY `SaleProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `saleproduct` DROP FOREIGN KEY `SaleProduct_saleId_fkey`;

-- DropIndex
DROP INDEX `Product_codeProduct_key` ON `product`;

-- AlterTable
ALTER TABLE `admin` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `client` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `barCode`,
    DROP COLUMN `codeProduct`,
    DROP COLUMN `investment`,
    DROP COLUMN `price`,
    DROP COLUMN `priceOffer`,
    DROP COLUMN `quantityDrawer`,
    DROP COLUMN `stock`,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- DropTable
DROP TABLE `saleproduct`;

-- CreateTable
CREATE TABLE `Business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeBusiness` VARCHAR(255) NOT NULL,
    `investment` DECIMAL(65, 30) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `priceOffer` DECIMAL(65, 30) NULL,
    `stock` INTEGER NOT NULL,
    `quantityDrawer` INTEGER NOT NULL,
    `barCode` VARCHAR(255) NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `productId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Business_codeBusiness_key`(`codeBusiness`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleBusiness` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `saleId` INTEGER NOT NULL,
    `businessId` INTEGER NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleBusiness` ADD CONSTRAINT `SaleBusiness_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleBusiness` ADD CONSTRAINT `SaleBusiness_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
