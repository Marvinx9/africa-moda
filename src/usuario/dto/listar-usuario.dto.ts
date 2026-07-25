import { ApiProperty } from '@nestjs/swagger';

export class ListarUsuarioDTO {
  @ApiProperty({ description: 'Id do usuário' })
  id: string;

  @ApiProperty({ description: 'Nome do usuário' })
  nome: string;
}
