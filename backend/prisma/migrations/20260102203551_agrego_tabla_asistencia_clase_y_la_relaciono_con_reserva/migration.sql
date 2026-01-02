-- CreateTable
CREATE TABLE `AsistenciaClase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `horacheckin` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `claseEspecificaId` INTEGER NOT NULL,
    `reservaId` INTEGER NULL,

    UNIQUE INDEX `AsistenciaClase_reservaId_key`(`reservaId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AsistenciaClase` ADD CONSTRAINT `AsistenciaClase_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AsistenciaClase` ADD CONSTRAINT `AsistenciaClase_claseEspecificaId_fkey` FOREIGN KEY (`claseEspecificaId`) REFERENCES `ClaseEspecifica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AsistenciaClase` ADD CONSTRAINT `AsistenciaClase_reservaId_fkey` FOREIGN KEY (`reservaId`) REFERENCES `Reserva`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
