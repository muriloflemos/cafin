import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { CreateEvolucaoDto } from './dto/create-evolucao.dto';
import { UpdateEvolucaoDto } from './dto/update-evolucao.dto';
import { FindEvolucaoDto } from './dto/find-evolucao.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class EvolucaoService {
  private readonly logger = new Logger(EvolucaoService.name);

  constructor(private readonly db: DBService) {}

  async create(data: CreateEvolucaoDto, usuario: Usuario) {
    return await this.db.evolucao.create({
      data: {
        ...data,
        usuarioId: usuario.id,
      },
    });
  }

  async update(id: number, data: UpdateEvolucaoDto) {
    return await this.db.evolucao.update({
      where: { id },
      data,
    });
  }

  private buildWhere(params: FindEvolucaoDto) {
    const where = {};

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

  count(params: FindEvolucaoDto): Promise<number> {
    return this.db.evolucao.count({
      where: this.buildWhere(params),
    });
  }

  findAll(params: FindEvolucaoDto, skip: number, take: number) {
    return this.db.evolucao.findMany({
      where: this.buildWhere(params),
      take: take !== null ? take : undefined,
      skip: skip !== null ? skip : undefined,
      orderBy: {
        data: 'desc',
      },
      include: {
        cliente: true,
      },
    });
  }

  findById(id: number) {
    return this.db.evolucao.findUnique({
      where: { id },
      include: {
        cliente: true,
      },
    });
  }

  async remove(id: number) {
    return await this.db.evolucao.delete({
      where: { id },
    });
  }
}
