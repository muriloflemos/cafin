import { Module } from '@nestjs/common';
import { EvolucaoService } from './evolucao.service';
import { EvolucaoController } from './evolucao.controller';
import { DBService } from '../db.service';
import { NotificacaoService } from '../notificacao/notificacao.service';
import { ClienteService } from '../cliente/cliente.service';

@Module({
  controllers: [EvolucaoController],
  providers: [EvolucaoService, DBService, NotificacaoService, ClienteService],
  exports: [EvolucaoService],
})
export class EvolucaoModule {}
