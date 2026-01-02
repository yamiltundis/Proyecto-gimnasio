-- CreateTable
CREATE TABLE `Reserva` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaReserva` DATETIME(3) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `claseEspecificaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_claseEspecificaId_fkey` FOREIGN KEY (`claseEspecificaId`) REFERENCES `ClaseEspecifica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
