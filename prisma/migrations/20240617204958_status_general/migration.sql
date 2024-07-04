/*
  Warnings:

  - You are about to alter the column `status` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `createdAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `createdAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `category` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `category` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `status` on the `client` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `createdAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `client` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `investment` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `price` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `priceOffer` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `createdAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `product` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `totalAmount` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Decimal`.
  - You are about to alter the column `createdAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `sale` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `createdAt` on the `saleproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `updatedAt` on the `saleproduct` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `status` on the `saleproduct` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.
  - You are about to alter the column `status` on the `subcategory` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Enum(EnumId(11))`.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `category` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL;

-- AlterTable
ALTER TABLE `client` MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `investment` DECIMAL NOT NULL,
    MODIFY `price` DECIMAL NOT NULL,
    MODIFY `priceOffer` DECIMAL NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL;

-- AlterTable
ALTER TABLE `sale` MODIFY `totalAmount` DECIMAL NOT NULL,
    MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL;

-- AlterTable
ALTER TABLE `saleproduct` MODIFY `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME NOT NULL,
    MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL;

-- AlterTable
ALTER TABLE `subcategory` MODIFY `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL;
