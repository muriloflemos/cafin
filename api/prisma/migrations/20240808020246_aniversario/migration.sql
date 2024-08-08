/*
  Warnings:

  - You are about to alter the column `data` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data` on the `evolucao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `avaliacao` MODIFY `data` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `cliente` ADD COLUMN `diaNascimento` INTEGER NULL,
    ADD COLUMN `mesNascimento` INTEGER NULL;

-- AlterTable
ALTER TABLE `evolucao` MODIFY `data` DATETIME NOT NULL;
