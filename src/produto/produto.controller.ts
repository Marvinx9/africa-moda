import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizar-produto.dto';
import { CriarProdutoDTO } from './dto/criar-produto.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ListarProdutoDTO } from './dto/listar-produto.dto';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @ApiOkResponse({ isArray: true, type: ListarProdutoDTO })
  async listaTodos() {
    return await this.produtoService.listarProdutos();
  }

  @Get(':id')
  @ApiOkResponse({ type: ListarProdutoDTO })
  async buscar(@Param('id', ParseUUIDPipe) id: string) {
    return await this.produtoService.buscarProduto(id);
  }

  @Post()
  async criaNovo(@Body() produto: CriarProdutoDTO) {
    return await this.produtoService.criarProduto(produto);
  }

  @Put('/:id')
  async atualiza(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() produto: AtualizaProdutoDTO,
  ) {
    await this.produtoService.atualizarProduto(id, produto);

    return {
      mensagem: 'produto atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.produtoService.deletarProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
    };
  }
}
