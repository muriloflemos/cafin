import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateNotificacaoDto {
  @IsNotEmpty()
  tipo: string;

  @IsNotEmpty()
  descricao: string;

  @IsOptional()
  conteudo: string;

  @IsOptional()
  @IsInt()
  usuarioId: number;
}
