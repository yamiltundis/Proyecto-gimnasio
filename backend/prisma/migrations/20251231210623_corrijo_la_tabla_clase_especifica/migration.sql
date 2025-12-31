/*
  Warnings:

  - Added the required column `tipoClaseId` to the `ClaseEspecifica` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ClaseEspecifica` ADD COLUMN `tipoClaseId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ClaseEspecifica` ADD CONSTRAINT `ClaseEspecifica_tipoClaseId_fkey` FOREIGN KEY (`tipoClaseId`) REFERENCES `TipoClase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
