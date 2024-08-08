import { Injectable, Logger } from '@nestjs/common';
import { DBService } from '../db.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FindClienteDto } from './dto/find-cliente.dto';
import { format } from 'date-fns';

@Injectable()
export class ClienteService {
  private readonly logger = new Logger(ClienteService.name);

  constructor(private readonly db: DBService) {}

  async create(data: CreateClienteDto) {
    let diaNascimento, mesNascimento;

    if (data.dataNascimento) {
      diaNascimento = Number(format(data.dataNascimento, 'dd'));
      mesNascimento = Number(format(data.dataNascimento, 'MM'));
    }

    return await this.db.cliente.create({
      data: {
        ...data,
        diaNascimento,
        mesNascimento,
      },
    });
  }

  async update(id: number, data: UpdateClienteDto) {
    let diaNascimento, mesNascimento;

    if (data.dataNascimento) {
      diaNascimento = Number(format(data.dataNascimento, 'dd'));
      mesNascimento = Number(format(data.dataNascimento, 'MM'));
    }

    return await this.db.cliente.update({
      where: { id },
      data: {
        ...data,
        diaNascimento,
        mesNascimento,
      },
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

    if (params.dataAniversario) {
      const diaNascimento = Number(format(params.dataAniversario, 'dd'));
      const mesNascimento = Number(format(params.dataAniversario, 'MM'));
      where['diaNascimento'] = diaNascimento;
      where['mesNascimento'] = mesNascimento;
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

  async addContadorEvolucao(id: number, count: number = 1) {
    try {
      const cliente = await this.findById(id);
      return await this.db.cliente.update({
        where: { id },
        data: { contadorEvolucoes: cliente.contadorEvolucoes + count },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateContadorEvolucao(id: number, contadorEvolucoes: number) {
    return await this.db.cliente.update({
      where: { id },
      data: { contadorEvolucoes },
    });
  }
}
