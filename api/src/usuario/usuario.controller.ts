import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { FindUsuarioDto } from './dto/find-usuario.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { PaginatedDTO } from '../classes/paginated.dto';
import { Usuario } from '@prisma/client';

@Controller('usuario')
export class UsuarioController {
  private readonly logger = new Logger(UsuarioController.name);

  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  async findAll(
    @Query() params: FindUsuarioDto,
  ): Promise<PaginatedDTO<Usuario>> {
    const count = await this.usuarioService.count(params);
    const data = await this.usuarioService.findAll(
      params,
      params.skip,
      params.take,
    );
    return new PaginatedDTO<Usuario>(count, data as Usuario[]);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findById(Number(id));
  }

  @Put(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(Number(id), updateUsuarioDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(Number(id));
  }
}
