import {
  IsEmail,
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  senha: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  roles: string[];
}
