import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { AtualizaProdutoDTO } from './dto/atualizar-produto.dto';
import { CriarProdutoDTO } from './dto/criar-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listarProdutos() {
    return await this.produtoRepository.find();
  }

  async criarProduto(produtoDTO: CriarProdutoDTO) {
    const produtoEntity = this.produtoRepository.create(produtoDTO);
    return await this.produtoRepository.save(produtoEntity);
  }

  async atualizarProduto(id: string, produtoAtualizar: AtualizaProdutoDTO) {
    const produto = await this.produtoRepository.preload({
      id,
      ...produtoAtualizar,
    });

    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }
    return await this.produtoRepository.save(produto);
  }

  async deletarProduto(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }

    await this.produtoRepository.delete(id);
    return produto;
  }
}
