import { Module } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoController } from './evolucao.controller';
import { DBService } from '../db.service';

@Module({
  controllers: [EvolucaoController],
  providers: [EvolucaoService, DBService],
  exports: [EvolucaoService],
})
export class EvolucaoModule {}
