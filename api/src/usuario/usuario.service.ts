import { Injectable } from '@nestjs/common';
import { DBService } from '../db.service';
import { PasswordHelper } from '../helpers/password/password';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FindUsuarioDto } from './dto/find-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly db: DBService) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    const passwordHash = await PasswordHelper.hash(createUsuarioDto.senha);
    return await this.db.usuario.create({
      data: {
        ...createUsuarioDto,
        senha: passwordHash,
      },
      omit: {
        senha: true,
      },
    });
  }

  findAll(params: FindUsuarioDto) {
    const where = {};

    if (params.email) {
      where['email'] = {
        contains: params.email,
      };
    }

    if (params.nome) {
      where['nome'] = {
        contains: params.nome,
      };
    }

    if (params.username) {
      where['username'] = {
        contains: params.username,
      };
    }

    return this.db.usuario.findMany({
      where,
      omit: {
        senha: true,
      },
    });
  }

  findById(id: number) {
    return this.db.usuario.findUnique({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }

  findByUsername(username: string) {
    return this.db.usuario.findUnique({
      where: { username },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.db.usuario.update({
      where: { id },
      data: updateUsuarioDto,
      omit: {
        senha: true,
      },
    });
  }

  remove(id: number) {
    return this.db.usuario.delete({
      where: { id },
      omit: {
        senha: true,
      },
    });
  }
}
