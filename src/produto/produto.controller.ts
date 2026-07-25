import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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

  @Post()
  async criaNovo(@Body() dadosProduto: CriarProdutoDTO) {
    return await this.produtoService.criarProduto(dadosProduto);
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    const produtoAlterado = await this.produtoService.atualizarProduto(
      id,
      dadosProduto,
    );

    return {
      mensagem: 'produto atualizado com sucesso',
      produto: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const produtoRemovido = await this.produtoService.deletarProduto(id);

    return {
      mensagem: 'produto removido com sucesso',
      produto: produtoRemovido,
    };
  }
}
