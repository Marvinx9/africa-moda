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

  async buscarProduto(id: string) {
    const produto = await this.produtoRepository.findOneBy({ id });

    if (!produto) {
      throw new NotFoundException('produto não encontrado!');
    }

    return produto;
  }

  async criarProduto(produto: CriarProdutoDTO) {
    const produto_entity = new ProdutoEntity();

    Object.assign(produto_entity, produto as ProdutoEntity);

    return await this.produtoRepository.save(produto_entity);
  }

  async atualizarProduto(id: string, produto: AtualizaProdutoDTO) {
    const produto_entity = await this.produtoRepository.findOneBy({
      id,
    });

    if (!produto_entity) {
      throw new NotFoundException('produto não encontrado!');
    }

    Object.assign(produto_entity, produto as ProdutoEntity);

    return await this.produtoRepository.save(produto_entity);
  }

  async deletarProduto(id: string) {
    const resultado = await this.produtoRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('produto não encontrado!');
    }
  }
}
