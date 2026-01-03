-- CreateTable
CREATE TABLE `Asistencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fechaHora` DATETIME(3) NOT NULL,
    `clienteId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
