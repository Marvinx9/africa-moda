import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriarPedidoDTO } from './dto/criar-pedido.dto';
import { AtualizarPedidoDTO } from './dto/atualizar-pedido.dto';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Get()
  async listar() {
    return await this.pedidoService.listarPedidos();
  }

  @Get('/usuario/:id')
  async listarPedidosDeUsuario(@Param('id') id: string) {
    return await this.pedidoService.obtemPedidosDeUsuario(id);
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    return await this.pedidoService.buscarPedido(id);
  }

  @Post()
  async criar(@Body() pedido: CriarPedidoDTO) {
    return await this.pedidoService.cadastraPedido(pedido);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() pedido: AtualizarPedidoDTO) {
    return await this.pedidoService.atualizarPedido(id, pedido);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.pedidoService.deletarPedido(id);
  }
}
