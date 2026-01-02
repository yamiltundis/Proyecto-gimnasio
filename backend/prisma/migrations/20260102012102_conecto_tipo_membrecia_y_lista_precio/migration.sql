/*
  Warnings:

  - Added the required column `tipoMembreciaId` to the `ListaPrecio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ListaPrecio` ADD COLUMN `tipoMembreciaId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ListaPrecio` ADD CONSTRAINT `ListaPrecio_tipoMembreciaId_fkey` FOREIGN KEY (`tipoMembreciaId`) REFERENCES `TipoMembrecia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
