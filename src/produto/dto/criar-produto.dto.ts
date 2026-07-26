import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CaracteristicaProdutoDTO {
  @ApiProperty({ description: 'o nome da caracterpistica do produto' })
  @IsString()
  @IsNotEmpty({ message: 'Nome da cadasterística não pode ser vazio' })
  nome: string;

  @ApiProperty({ description: 'a descrição da característica do produto' })
  @IsString()
  @IsNotEmpty({ message: 'Descrição da característica não pode ser vazio' })
  descricao: string;
}

export class ImagemProdutoDTO {
  @ApiProperty({ description: 'a url da imagem do produto' })
  @IsUrl()
  url: string;

  @ApiProperty({ description: 'a descrição da imagem do produto' })
  @IsString()
  @IsNotEmpty({ message: 'Descrição da imagem não pode ser vazia' })
  descricao: string;
}

export class CriarProdutoDTO {
  @ApiProperty({ description: 'o nome do produto a ser criado' })
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  nome: string;

  @ApiProperty({ description: 'o valor para venda do produto' })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  valor: number;

  @ApiProperty({ description: 'a quantidade do produto disponível' })
  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  quantidade: number;

  @ApiProperty({ description: 'a descrição do produto' })
  @IsString()
  @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
  @MaxLength(1000, {
    message: 'Descrição não pode ter mais que 1000 caracteres',
  })
  descricao: string;

  @ApiProperty({
    description: 'as características do produto',
    isArray: true,
    type: CaracteristicaProdutoDTO,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  caracteristicas: CaracteristicaProdutoDTO[];

  @ApiProperty({
    description: 'as imagens do produto',
    isArray: true,
    type: ImagemProdutoDTO,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  imagens: ImagemProdutoDTO[];

  @ApiProperty({ description: 'a categoria do produto' })
  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  categoria: string;
}
