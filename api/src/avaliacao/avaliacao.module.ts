import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from './avaliacao.controller';
import { DBService } from '../db.service';

@Module({
  controllers: [AvaliacaoController],
  providers: [AvaliacaoService, DBService],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}
