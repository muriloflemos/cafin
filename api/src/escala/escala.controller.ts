import { Controller, Get } from '@nestjs/common';
import { EscalaService } from './escala.service';
import { Escala } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Roles(Role.ADMIN, Role.AVALIACAO)
@Controller('escala')
export class EscalaController {
  constructor(private readonly escalaService: EscalaService) {}

  @Get()
  async findAll(): Promise<Escala[]> {
    return await this.escalaService.findAll();
  }
}
