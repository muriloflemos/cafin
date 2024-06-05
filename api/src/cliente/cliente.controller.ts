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
import { Cliente } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { FindClienteDto } from './dto/find-cliente.dto';
import { PaginatedDTO } from '../classes/paginated.dto';

@Roles(Role.ADMIN, Role.CLIENTE)
@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

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
    return this.clienteService.update(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteService.remove(+id);
  }
}
