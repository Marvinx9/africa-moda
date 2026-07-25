import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailEhUnico } from '../validacao/email-eh-unico.validator';
import { ApiProperty } from '@nestjs/swagger';

export class CriarUsuarioDTO {
  @ApiProperty({ description: 'O nome do usuário' })
  @IsString()
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @ApiProperty({ description: 'O email do usuário' })
  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @EmailEhUnico({ message: 'Já existe um usuário com este e-mail' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário' })
  @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
  senha: string;
}
