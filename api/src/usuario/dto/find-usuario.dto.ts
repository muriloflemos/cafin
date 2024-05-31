import { Type } from 'class-transformer';
import { IsEmail, IsOptional, IsString, IsInt } from 'class-validator';

export class FindUsuarioDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  skip: number = 0;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  take: number = 10;
}
