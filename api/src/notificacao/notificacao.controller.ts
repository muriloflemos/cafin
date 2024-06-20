import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { NotificacaoService } from './notificacao.service';
import { Notificacao, Usuario } from '@prisma/client';
import { GetUser } from '..//usuario/usuario.decorator';

@Controller('notificacao')
export class NotificacaoController {
  constructor(private readonly notificacaoService: NotificacaoService) {}

  @Get()
  async findAll(@GetUser() usuario: Usuario): Promise<Notificacao[]> {
    return await this.notificacaoService.findAll(usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notificacaoService.remove(Number(id));
  }

  @Post('visualizar/:id')
  async visualizar(@Param('id') id: string) {
    const notificacao = await this.notificacaoService.findById(Number(id));

    switch (notificacao.tipo) {
      case 'CONTADOR_EVOLUCAO':
        this.notificacaoService.reduzirContadorEvolucoes(notificacao, 15);
      default:
    }

    return this.notificacaoService.visualizar(Number(id));
  }
}
