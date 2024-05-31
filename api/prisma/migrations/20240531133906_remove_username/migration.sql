/*
  Warnings:

  - You are about to drop the column `username` on the `usuario` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `usuario_username_key` ON `usuario`;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `username`,
    MODIFY `senha` VARCHAR(100) NOT NULL;
