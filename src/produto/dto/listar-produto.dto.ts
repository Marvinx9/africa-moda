import { ApiProperty } from '@nestjs/swagger';

class CaracteristicaProdutoDTO {
  @ApiProperty({ description: 'o nome da característica do produto' })
  nome: string;

  @ApiProperty({ description: 'a descrição da característica do produto' })
  descricao: string;
}

class ImagemProdutoDTO {
  @ApiProperty({ description: 'a url da imagem do produto' })
  url: string;

  @ApiProperty({ description: 'a descrição da imagem do produto' })
  descricao: string;
}

export class ListarProdutoDTO {
  @ApiProperty({ description: 'o id do produto' })
  id: string;

  @ApiProperty({ description: 'o id do usuário' })
  usuarioId: string;

  @ApiProperty({ description: '' })
  nome: string;

  @ApiProperty({ description: 'o valor do produto' })
  valor: number;

  @ApiProperty({ description: 'a quantidade do produto' })
  quantidade: number;

  @ApiProperty({ description: 'a descrição do produto' })
  descricao: string;

  @ApiProperty({ description: 'a categoria do produto' })
  categoria: string;

  @ApiProperty({
    description: 'as características do produto',
    type: CaracteristicaProdutoDTO,
    isArray: true,
  })
  caracteristicas: CaracteristicaProdutoDTO[];

  @ApiProperty({
    description: 'as imagens do produto',
    type: ImagemProdutoDTO,
    isArray: true,
  })
  imagens: ImagemProdutoDTO[];
}
