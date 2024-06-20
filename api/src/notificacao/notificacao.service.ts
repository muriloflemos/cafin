import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { CreateNotificacaoDto } from './dto/create-notificacao.dto';
import { Notificacao, Usuario } from '@prisma/client';
import { Role } from '../enums/role.enum';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class NotificacaoService {
  private readonly logger = new Logger(NotificacaoService.name);

  constructor(
    private readonly db: DBService,
    private readonly clienteService: ClienteService,
  ) {}

  async findAll(usuario: Usuario) {
    const userRoles = await this.db.usuarioRoles.findMany({
      where: { usuarioId: usuario.id },
    });
    const roles = userRoles.map((userRole) => userRole.role);

    let where;
    if (roles.includes(Role.ADMIN)) {
      where = {
        OR: [
          {
            usuarioId: usuario.id,
          },
          {
            usuarioId: null,
          },
        ],
      };
    } else {
      where = {
        usuarioId: usuario.id,
      };
    }

    return this.db.notificacao.findMany({
      where: {
        ...where,
        visto: false,
      },
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(data: CreateNotificacaoDto) {
    return await this.db.notificacao.create({
      data: {
        ...data,
        visto: false,
      },
    });
  }

  async findById(id: number) {
    return await this.db.notificacao.findFirst({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.db.notificacao.delete({
      where: { id },
    });
  }

  async visualizar(id: number) {
    return await this.db.notificacao.update({
      data: { visto: true },
      where: { id },
    });
  }

  async reduzirContadorEvolucoes(notificacao: Notificacao, count: number) {
    try {
      const { cliente } = JSON.parse(notificacao.conteudo as string);
      this.clienteService.updateContadorEvolucao(
        cliente.id,
        cliente.contadorEvolucoes - count,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
}
