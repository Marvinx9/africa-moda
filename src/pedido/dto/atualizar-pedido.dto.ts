import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { StatusPedido } from '../enum/status-pedido.enum';

export class AtualizarPedidoDTO {
  @ApiProperty({ description: 'status do pedido' })
  @IsEnum(StatusPedido)
  status: StatusPedido;
}
