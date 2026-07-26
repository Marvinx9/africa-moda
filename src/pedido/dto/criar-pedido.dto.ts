import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ItemPedidoDTO {
  @ApiProperty({ description: 'o id do produto' })
  @IsNotEmpty()
  @IsUUID()
  produto_id: string;

  @ApiProperty({ description: 'a quantidade do produto no pedido' })
  @IsNotEmpty()
  @IsInt()
  quantidade: number;
}

export class CriarPedidoDTO {
  @ApiProperty({ description: 'o id do usuário que esta realizando o pedido' })
  @IsNotEmpty()
  @IsString()
  usuario_id: string;

  @ApiProperty({
    description: 'os intens do pedido',
    isArray: true,
    type: ItemPedidoDTO,
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDTO)
  itens_pedido: ItemPedidoDTO[];
}
