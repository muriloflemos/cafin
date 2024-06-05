import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsDate,
  IsInt,
} from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsOptional()
  telefone: string;

  @IsOptional()
  endereco: string;

  @IsOptional()
  estadoCivil: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  filhos: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  dataNascimento: Date;

  @IsOptional()
  cpf: string;

  @IsOptional()
  rg: string;

  @IsOptional()
  diagnosticoClinico: string;

  @IsOptional()
  diagnosticoFisioterapeutico: string;
}
