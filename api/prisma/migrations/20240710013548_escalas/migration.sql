/*
  Warnings:

  - You are about to alter the column `data` on the `evolucao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `evolucao` MODIFY `data` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `escala` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escala_grupo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `instrucao` VARCHAR(500) NULL,
    `escalaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `escala_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(200) NOT NULL,
    `pontos` DECIMAL(15, 2) NOT NULL,
    `grupoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `escala_grupo` ADD CONSTRAINT `escala_grupo_escalaId_fkey` FOREIGN KEY (`escalaId`) REFERENCES `escala`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `escala_item` ADD CONSTRAINT `escala_item_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `escala_grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
