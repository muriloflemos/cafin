/*
  Warnings:

  - You are about to drop the column `pontuacao` on the `avaliacao` table. All the data in the column will be lost.
  - You are about to alter the column `data` on the `avaliacao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `data` on the `evolucao` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `avaliacao` DROP COLUMN `pontuacao`,
    MODIFY `data` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `evolucao` MODIFY `data` DATETIME NOT NULL;
