import { Type } from 'class-transformer';
import { IsNotEmpty, IsDate, IsInt } from 'class-validator';

export class CreateEvolucaoDto {
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  data: Date;

  @IsNotEmpty()
  descricao: string;

  @IsInt()
  @IsNotEmpty()
  clienteId: number;
}
