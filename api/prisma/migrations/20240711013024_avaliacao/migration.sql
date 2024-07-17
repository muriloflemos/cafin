/*
  Warnings:

  - You are about to alter the column `data` on the `evolucao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `evolucao` MODIFY `data` DATETIME NOT NULL;

-- CreateTable
CREATE TABLE `avaliacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data` DATETIME NOT NULL,
    `clienteId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `pontuacao` DECIMAL(15, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `avaliacao_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avaliacaoId` INTEGER NOT NULL,
    `grupoId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `pontuacao` DECIMAL(15, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `avaliacao_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `cliente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao` ADD CONSTRAINT `avaliacao_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao_item` ADD CONSTRAINT `avaliacao_item_avaliacaoId_fkey` FOREIGN KEY (`avaliacaoId`) REFERENCES `avaliacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao_item` ADD CONSTRAINT `avaliacao_item_grupoId_fkey` FOREIGN KEY (`grupoId`) REFERENCES `escala_grupo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `avaliacao_item` ADD CONSTRAINT `avaliacao_item_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `escala_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
