-- CreateTable
CREATE TABLE `cliente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(200) NOT NULL,
    `telefone` VARCHAR(30) NULL,
    `endereco` VARCHAR(200) NULL,
    `estadoCivil` VARCHAR(50) NULL,
    `filhos` INTEGER NULL,
    `email` VARCHAR(200) NULL,
    `dataNascimento` DATE NULL,
    `cpf` VARCHAR(20) NULL,
    `rg` VARCHAR(200) NULL,
    `diagnosticoClinico` LONGTEXT NULL,
    `diagnosticoFisioterapeutico` LONGTEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
