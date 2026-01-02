-- CreateTable
CREATE TABLE `Pago` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` INTEGER NOT NULL,
    `fecha` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `tipoMembreciaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_tipoMembreciaId_fkey` FOREIGN KEY (`tipoMembreciaId`) REFERENCES `TipoMembrecia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
