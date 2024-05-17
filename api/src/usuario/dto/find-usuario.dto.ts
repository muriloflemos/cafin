import { IsEmail, IsOptional, IsString } from 'class-validator';

export class FindUsuarioDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  nome: string;

  @IsString()
  @IsOptional()
  username: string;
}
