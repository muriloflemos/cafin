import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsString, IsEmail, IsDate } from 'class-validator';

export class FindClienteDto {
  @IsString()
  @IsOptional()
  nome: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  cpf: string;

  @IsString()
  @IsOptional()
  rg: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dataNascimentoStart: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dataNascimentoEnd: Date;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip: number = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take: number = 10;
}
