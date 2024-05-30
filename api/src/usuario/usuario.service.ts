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
        email: createUsuarioDto.email,
        nome: createUsuarioDto.nome,
        username: createUsuarioDto.username,
        senha: passwordHash,
        roles: {
          createMany: {
            data: createUsuarioDto.roles.map((role: string) => ({
              role,
            })),
          },
        },
      },
      omit: {
        senha: true,
      },
    });
  }

  private buildWhere(params: FindUsuarioDto) {
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

    return where;
  }

  count(params: FindUsuarioDto): Promise<number> {
    return this.db.usuario.count({
      where: this.buildWhere(params),
    });
  }

  findAll(params: FindUsuarioDto, skip: number, take: number) {
    return this.db.usuario.findMany({
      where: this.buildWhere(params),
      omit: {
        senha: true,
      },
      take: take !== null ? take : undefined,
      skip: skip !== null ? skip : undefined,
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
      include: {
        roles: true,
      },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    this.db.usuarioRoles.deleteMany({
      where: {
        usuarioId: id,
      },
    });
    return this.db.usuario.update({
      where: { id },
      data: {
        email: updateUsuarioDto.email,
        nome: updateUsuarioDto.nome,
        username: updateUsuarioDto.username,
        roles: {
          createMany: {
            data: updateUsuarioDto.roles.map((role: string) => ({
              role,
            })),
          },
        },
      },
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
