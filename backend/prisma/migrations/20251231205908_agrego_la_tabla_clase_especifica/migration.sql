-- CreateTable
CREATE TABLE `ClaseEspecifica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diaHora` DATETIME(3) NOT NULL,
    `cantmax` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
