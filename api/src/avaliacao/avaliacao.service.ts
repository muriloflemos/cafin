import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { Avaliacao } from '@prisma/client';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { FindAvaliacaoDto } from './dto/find-avaliacao.dto';
import { Role } from '../enums/role.enum';
import { UsuarioWithRoles } from '../usuario/usuario.decorator';

@Injectable()
export class AvaliacaoService {
  private readonly logger = new Logger(AvaliacaoService.name);

  constructor(private readonly db: DBService) {}

  async create(
    data: CreateAvaliacaoDto,
    usuario: UsuarioWithRoles,
  ): Promise<Avaliacao> {
    try {
      return await this.db.avaliacao.create({
        data: {
          data: data.data,
          clienteId: data.clienteId,
          usuarioId: usuario.id,
          items: {
            createMany: {
              data: data.items.map((value) => ({
                grupoId: value.grupoId,
                itemId: value.itemId,
                pontuacao: value.pontuacao,
              })),
            },
          },
        },
        include: {
          items: true,
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  private buildWhere(params: FindAvaliacaoDto, usuario: UsuarioWithRoles) {
    const where = {};

    const roles = usuario.roles.map((role) => role.role);
    if (!roles.includes(Role.ADMIN)) {
      where['usuarioId'] = usuario.id;
    }

    if (params.cliente) {
      where['cliente'] = {
        nome: {
          contains: params.cliente,
        },
      };
    }

    if (params.startDate && params.endDate) {
      where['data'] = {
        gte: params.startDate,
        lte: params.endDate,
      };
    }

    return where;
  }

  count(params: FindAvaliacaoDto, usuario: UsuarioWithRoles): Promise<number> {
    return this.db.avaliacao.count({
      where: this.buildWhere(params, usuario),
    });
  }

  findAll(
    params: FindAvaliacaoDto,
    skip: number,
    take: number,
    usuario: UsuarioWithRoles,
  ) {
    return this.db.avaliacao.findMany({
      where: this.buildWhere(params, usuario),
      take: take !== null ? take : undefined,
      skip: skip !== null ? skip : undefined,
      orderBy: {
        data: 'desc',
      },
      include: {
        cliente: true,
        items: true,
      },
    });
  }

  findById(id: number) {
    return this.db.avaliacao.findUnique({
      where: { id },
      include: {
        cliente: true,
        items: true,
      },
    });
  }

  async remove(id: number) {
    try {
      await this.db.avaliacaoItem.deleteMany({
        where: {
          avaliacaoId: id,
        },
      });
      return await this.db.avaliacao.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  historico(clienteId: number, usuario: UsuarioWithRoles) {
    const where = {
      clienteId,
    };

    const roles = usuario.roles.map((role) => role.role);
    if (!roles.includes(Role.ADMIN)) {
      where['usuarioId'] = usuario.id;
    }

    return this.db.avaliacao.findMany({
      where,
      orderBy: {
        data: 'asc',
      },
      include: {
        items: true,
      },
    });
  }
}
