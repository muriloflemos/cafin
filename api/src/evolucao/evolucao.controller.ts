import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Evolucao } from '@prisma/client';
import { EvolucaoService } from './evolucao.service';
import { CreateEvolucaoDto } from './dto/create-evolucao.dto';
import { UpdateEvolucaoDto } from './dto/update-evolucao.dto';
import { FindEvolucaoDto } from './dto/find-evolucao.dto';
import { GetUser, UsuarioWithRoles } from '../usuario/usuario.decorator';
import { PaginatedDTO } from '../classes/paginated.dto';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../enums/role.enum';

@Roles(Role.ADMIN, Role.EVOLUCAO)
@Controller('evolucao')
export class EvolucaoController {
  constructor(private readonly evolucaoService: EvolucaoService) {}

  @Post()
  create(
    @Body() createEvolucaoDto: CreateEvolucaoDto,
    @GetUser() usuario: UsuarioWithRoles,
  ) {
    return this.evolucaoService.create(createEvolucaoDto, usuario);
  }

  @Get()
  async findAll(
    @Query() params: FindEvolucaoDto,
    @GetUser() usuario: UsuarioWithRoles,
  ): Promise<PaginatedDTO<Evolucao>> {
    const count = await this.evolucaoService.count(params, usuario);
    const data = await this.evolucaoService.findAll(
      params,
      params.skip,
      params.take,
      usuario,
    );
    return new PaginatedDTO<Evolucao>(count, data as Evolucao[]);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.evolucaoService.findById(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateEvolucaoDto: UpdateEvolucaoDto,
  ) {
    return this.evolucaoService.update(Number(id), updateEvolucaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.evolucaoService.remove(Number(id));
  }
}
