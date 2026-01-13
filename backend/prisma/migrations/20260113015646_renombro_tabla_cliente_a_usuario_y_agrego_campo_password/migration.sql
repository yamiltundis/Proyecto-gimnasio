ALTER TABLE `Cliente` RENAME TO `Usuario`;
ALTER TABLE `Usuario` ADD COLUMN `password` VARCHAR(191) NOT NULL DEFAULT '';

-- Actualizar las foreign keys para que apunten a Usuario, manteniendo el nombre clienteId
ALTER TABLE `Pago` DROP FOREIGN KEY `Pago_clienteId_fkey`;
ALTER TABLE `Pago` ADD CONSTRAINT `Pago_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `MembreciaActiva` DROP FOREIGN KEY `MembreciaActiva_clienteId_fkey`;
ALTER TABLE `MembreciaActiva` ADD CONSTRAINT `MembreciaActiva_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Reserva` DROP FOREIGN KEY `Reserva_clienteId_fkey`;
ALTER TABLE `Reserva` ADD CONSTRAINT `Reserva_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `AsistenciaClase` DROP FOREIGN KEY `AsistenciaClase_clienteId_fkey`;
ALTER TABLE `AsistenciaClase` ADD CONSTRAINT `AsistenciaClase_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Asistencia` DROP FOREIGN KEY `Asistencia_clienteId_fkey`;
ALTER TABLE `Asistencia` ADD CONSTRAINT `Asistencia_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;