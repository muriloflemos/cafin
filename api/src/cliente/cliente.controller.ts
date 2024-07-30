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
import { Cliente } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ClienteService } from './cliente.service';
import { AvaliacaoService } from '../avaliacao/avaliacao.service';
import { EscalaService } from '../escala/escala.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FindClienteDto } from './dto/find-cliente.dto';
import { PaginatedDTO } from '../classes/paginated.dto';
import { Historico } from './entities/historico.entity';
import { GetUser, UsuarioWithRoles } from '../usuario/usuario.decorator';

@Roles(Role.ADMIN, Role.CLIENTE)
@Controller('cliente')
export class ClienteController {
  private readonly logger = new Logger(ClienteController.name);

  constructor(
    private readonly clienteService: ClienteService,
    private readonly avaliacaoService: AvaliacaoService,
    private readonly escalaService: EscalaService,
  ) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  async findAll(
    @Query() params: FindClienteDto,
  ): Promise<PaginatedDTO<Cliente>> {
    const count = await this.clienteService.count(params);
    const data = await this.clienteService.findAll(
      params,
      params.skip,
      params.take,
    );
    return new PaginatedDTO<Cliente>(count, data as Cliente[]);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.clienteService.findById(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clienteService.update(Number(id), updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(Number(id));
  }

  @Get('historico/:id')
  async historico(
    @Param('id') id: string,
    @GetUser() usuario: UsuarioWithRoles,
  ): Promise<Historico[]> {
    const escalas = await this.escalaService.findAll();
    const avaliacoes = await this.avaliacaoService.historico(
      Number(id),
      usuario,
    );
    return escalas.map((escala) => {
      const grupoIds = escala.grupos.map((grupo) => grupo.id);
      const pontos = avaliacoes.map((avaliacao) => {
        const pontos = avaliacao.items.reduce((acc, item) => {
          if (grupoIds.includes(item.grupoId)) {
            acc = acc + Number(item.pontuacao);
          }
          return acc;
        }, 0);
        return {
          data: avaliacao.data,
          pontos,
        };
      });
      return {
        nome: escala.descricao,
        pontos,
      };
    });
  }
}
