import { Module } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';
import { DBService } from '../db.service';
import { ClienteService } from '../cliente/cliente.service';

@Module({
  controllers: [NotificacaoController],
  providers: [NotificacaoService, DBService, ClienteService],
  exports: [NotificacaoService],
})
export class NotificacaoModule {}
