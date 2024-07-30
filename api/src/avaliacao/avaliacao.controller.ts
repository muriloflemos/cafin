import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { FindAvaliacaoDto } from './dto/find-avaliacao.dto';
import { GetUser, UsuarioWithRoles } from '../usuario/usuario.decorator';
import { PaginatedDTO } from '../classes/paginated.dto';
import { Avaliacao } from '@prisma/client';

@Roles(Role.ADMIN, Role.AVALIACAO)
@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(
    @Body() data: CreateAvaliacaoDto,
    @GetUser() usuario: UsuarioWithRoles,
  ) {
    return this.avaliacaoService.create(data, usuario);
  }

  @Get()
  async findAll(
    @Query() params: FindAvaliacaoDto,
    @GetUser() usuario: UsuarioWithRoles,
  ): Promise<PaginatedDTO<Avaliacao>> {
    const count = await this.avaliacaoService.count(params, usuario);
    const data = await this.avaliacaoService.findAll(
      params,
      params.skip,
      params.take,
      usuario,
    );
    return new PaginatedDTO<Avaliacao>(count, data as Avaliacao[]);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.avaliacaoService.findById(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.avaliacaoService.remove(Number(id));
  }
}
