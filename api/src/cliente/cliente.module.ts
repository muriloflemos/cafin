import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';
import { EscalaService } from '../escala/escala.service';
import { DBService } from '../db.service';

@Module({
  controllers: [ClienteController],
  providers: [ClienteService, AvaliacaoService, EscalaService, DBService],
  exports: [ClienteService],
})
export class ClienteModule {}
