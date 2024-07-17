import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateAvaliacaoItemDto {
  @IsInt()
  @IsNotEmpty()
  grupoId: number;

  @IsInt()
  @IsNotEmpty()
  itemId: number;

  @IsInt()
  @IsNotEmpty()
  pontuacao: number;
}

export class CreateAvaliacaoDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  data: Date;

  @IsInt()
  @IsNotEmpty()
  clienteId: number;

  @IsNotEmpty()
  items: CreateAvaliacaoItemDto[];
}
