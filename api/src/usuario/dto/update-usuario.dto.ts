import { PickType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';

export class UpdateUsuarioDto extends PickType(CreateUsuarioDto, [
  'nome',
  'email',
  'roles',
] as const) {}
