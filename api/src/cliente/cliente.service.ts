import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FindClienteDto } from './dto/find-cliente.dto';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(private readonly db: DBService) {}

  async create(data: CreateClienteDto) {
    return await this.db.cliente.create({
      data,
    });
  }

  async update(id: number, data: UpdateClienteDto) {
    return await this.db.cliente.update({
      where: { id },
      data,
    });
  }

  private buildWhere(params: FindClienteDto) {
    const where = {};

    if (params.nome) {
      where['nome'] = {
        contains: params.nome,
      };
    }

    if (params.email) {
      where['email'] = {
        contains: params.email,
      };
    }

    if (params.cpf) {
      where['cpf'] = params.cpf;
    }

    if (params.rg) {
      where['rg'] = params.rg;
    }

    if (params.dataNascimentoStart && params.dataNascimentoEnd) {
      where['dataNascimento'] = {
        gte: params.dataNascimentoStart,
        lte: params.dataNascimentoEnd,
      };
    }

    return where;
  }

  count(params: FindClienteDto): Promise<number> {
    return this.db.cliente.count({
      where: this.buildWhere(params),
    });
  }

  findAll(params: FindClienteDto, skip: number, take: number) {
    return this.db.cliente.findMany({
      where: this.buildWhere(params),
      take: take !== null ? take : undefined,
      skip: skip !== null ? skip : undefined,
      orderBy: {
        nome: 'asc',
      },
    });
  }

  findById(id: number) {
    return this.db.cliente.findUnique({
      where: { id },
    });
  }

  async remove(id: number) {
    return await this.db.cliente.delete({
      where: { id },
    });
  }
}
