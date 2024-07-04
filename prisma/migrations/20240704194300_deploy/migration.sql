-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `documentType` ENUM('DNI', 'RUC', 'Carnet_Extranjeria') NOT NULL,
    `documentNumber` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `isVerify` BOOLEAN NOT NULL DEFAULT false,
    `statusUser` ENUM('Activo', 'Suspendido', 'Vacaciones') NOT NULL DEFAULT 'Activo',
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `roleAdmin` ENUM('Gerente', 'Administrador', 'Empleado') NOT NULL,
    `secretKey` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Admin_username_key`(`username`),
    UNIQUE INDEX `Admin_secretKey_key`(`secretKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `documentType` ENUM('DNI', 'RUC', 'Carnet_Extranjeria') NOT NULL,
    `documentNumber` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subcategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `categoryId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `subcategoryId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` INTEGER NOT NULL,
    `codeBusiness` VARCHAR(255) NOT NULL,
    `investment` DECIMAL(10, 2) NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `priceOffer` DECIMAL(10, 2) NULL,
    `initialStock` INTEGER NOT NULL,
    `stock` INTEGER NOT NULL,
    `quantityDrawer` INTEGER NOT NULL,
    `barCode` VARCHAR(255) NOT NULL,
    `bill` VARCHAR(255) NULL,
    `statusBusiness` ENUM('Activo', 'En_cola', 'Culminado') NOT NULL DEFAULT 'Activo',
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `productId` INTEGER NOT NULL,
    `supplierId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Business_codeBusiness_key`(`codeBusiness`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(255) NOT NULL,
    `productId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Supplier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `documentType` ENUM('DNI', 'RUC', 'Carnet_Extranjeria') NOT NULL,
    `documentNumber` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `codeSale` VARCHAR(255) NOT NULL,
    `deliveryType` ENUM('RECOJO', 'ENVIO') NOT NULL,
    `agency` VARCHAR(255) NULL,
    `region` VARCHAR(255) NULL,
    `province` VARCHAR(255) NULL,
    `district` VARCHAR(255) NULL,
    `direction` VARCHAR(255) NULL,
    `reference` VARCHAR(255) NULL,
    `bills` VARCHAR(255) NOT NULL,
    `guide` VARCHAR(255) NULL,
    `totalAmount` DECIMAL(10, 2) NOT NULL,
    `statusSale` ENUM('Pagado', 'Enviando', 'Culminado', 'Cancelado') NOT NULL DEFAULT 'Pagado',
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `adminId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    UNIQUE INDEX `Sale_codeSale_key`(`codeSale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleBusiness` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `saleId` INTEGER NOT NULL,
    `businessId` INTEGER NOT NULL,
    `status` ENUM('Habilitado', 'Deshabilitado') NOT NULL DEFAULT 'Habilitado',
    `createdAt` DATETIME NOT NULL,
    `updatedAt` DATETIME NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Subcategory` ADD CONSTRAINT `Subcategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Business` ADD CONSTRAINT `Business_supplierId_fkey` FOREIGN KEY (`supplierId`) REFERENCES `Supplier`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `Client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleBusiness` ADD CONSTRAINT `SaleBusiness_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleBusiness` ADD CONSTRAINT `SaleBusiness_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
