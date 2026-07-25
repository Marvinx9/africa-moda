import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  CaracteristicaProdutoDTO,
  ImagemProdutoDTO,
} from './criar-produto.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AtualizaProdutoDTO {
  @ApiProperty({ description: 'o id do usuário que vai atualizar o produto' })
  @IsUUID(undefined, { message: 'ID de usuário inválido' })
  usuario_id: string;

  @ApiProperty({ description: 'o nome do produto', required: false })
  @IsString()
  @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
  @IsOptional()
  nome: string;

  @ApiProperty({ description: 'o preço do produto', required: false })
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1, { message: 'O valor precisa ser maior que zero' })
  @IsOptional()
  valor: number;

  @ApiProperty({ description: 'a quantidade do produto', required: false })
  @IsNumber()
  @Min(0, { message: 'Quantidade mínima inválida' })
  @IsOptional()
  quantidade: number;

  @ApiProperty({ description: 'a descrição do produto', required: false })
  @IsString()
  @IsOptional()
  descricao: string;

  @ApiProperty({
    description: 'as caracterpisticas do produto',
    isArray: true,
    type: CaracteristicaProdutoDTO,
    required: false,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CaracteristicaProdutoDTO)
  @IsOptional()
  caracteristicas: CaracteristicaProdutoDTO[];

  @ApiProperty({
    description: 'as imagens do produto',
    isArray: true,
    type: ImagemProdutoDTO,
    required: false,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ImagemProdutoDTO)
  @IsOptional()
  imagens: ImagemProdutoDTO[];

  @ApiProperty({ description: 'a categoria do produto', required: false })
  @IsString()
  @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
  @IsOptional()
  categoria: string;
}
