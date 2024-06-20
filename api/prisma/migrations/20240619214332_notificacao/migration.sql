/*
  Warnings:

  - Made the column `data` on table `evolucao` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `contadorEvolucoes` INTEGER NULL;

-- AlterTable
ALTER TABLE `evolucao` MODIFY `data` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `notificacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(100) NOT NULL,
    `visto` BOOLEAN NOT NULL,
    `descricao` VARCHAR(200) NULL,
    `conteudo` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuarioId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notificacao` ADD CONSTRAINT `notificacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
