import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PedidoEntity } from './pedido.entity';
import { DataSource, In, Repository } from 'typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { StatusPedido } from './enum/status-pedido.enum';
import { CriarPedidoDTO } from './dto/criar-pedido.dto';
import { AtualizarPedidoDTO } from './dto/atualizar-pedido.dto';
import { ItemPedidoEntity } from './item-pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(PedidoEntity)
    private readonly pedidoRepository: Repository<PedidoEntity>,
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
    private dataSource: DataSource,
  ) {}

  async listarPedidos() {
    return await this.pedidoRepository.find({
      relations: {
        itens_pedido: true,
      },
    });
  }

  async buscarPedido(id: string) {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { itens_pedido: true },
    });

    if (!pedido) {
      throw new NotFoundException('pedido não encontrado!');
    }

    return pedido;
  }

  async obtemPedidosDeUsuario(usuario_id: string) {
    return await this.pedidoRepository.find({
      where: {
        usuario: { id: usuario_id },
      },
      relations: {
        itens_pedido: true,
      },
    });
  }

  async cadastraPedido(pedido: CriarPedidoDTO) {
    const usuario = await this.usuarioRepository.findOneBy({
      id: pedido.usuario_id,
    });

    const produtos_ids = pedido.itens_pedido.map(
      (item_pedido) => item_pedido.produto_id,
    );
    const produtos_relacionados = await this.produtoRepository.findBy({
      id: In(produtos_ids),
    });

    const pedido_entity = new PedidoEntity();

    const itens_pedido_entidades = pedido.itens_pedido.map((item_pedido) => {
      const produto_relacionado = produtos_relacionados.find(
        (produto) => produto.id === item_pedido.produto_id,
      );

      if (!produto_relacionado) {
        throw new BadRequestException(
          `o produto: ${item_pedido.produto_id} não está disponível`,
        );
      }

      if (item_pedido.quantidade > produto_relacionado.quantidade) {
        throw new BadRequestException(
          `quantidade disponível do item ${produto_relacionado.nome}, é de ${produto_relacionado.quantidade}!`,
        );
      }

      const item_pedido_entity = new ItemPedidoEntity();

      Object.assign(item_pedido_entity, {
        produto: produto_relacionado,
        preco_venda: produto_relacionado.valor,
        quantidade: item_pedido.quantidade,
      } as ItemPedidoEntity);

      item_pedido_entity.produto.quantidade -= item_pedido.quantidade;
      return item_pedido_entity;
    });

    const valor_total = itens_pedido_entidades.reduce((total, item) => {
      return total + item.preco_venda * item.quantidade;
    }, 0);

    Object.assign(pedido_entity, {
      status: StatusPedido.EM_PROCESSAMENTO,
      usuario: usuario,
      itens_pedido: itens_pedido_entidades,
      valor_total,
    } as PedidoEntity);

    const pedido_criado = await this.pedidoRepository.save(pedido_entity);
    return pedido_criado;
  }

  async atualizarPedido(id: string, pedido: AtualizarPedidoDTO) {
    const pedido_entity = await this.pedidoRepository.findOne({
      where: { id },
      relations: { itens_pedido: { produto: true } },
    });

    if (!pedido_entity) {
      throw new NotFoundException(`pedido ${id} não foi encontrado!`);
    }

    await this.dataSource.transaction(async (manager) => {
      if (
        pedido.status === StatusPedido.CANCELADO &&
        pedido_entity.status !== StatusPedido.CANCELADO
      ) {
        for (const item of pedido_entity.itens_pedido) {
          item.produto.quantidade += item.quantidade;
        }

        const produtos = pedido_entity.itens_pedido.map((item) => item.produto);
        await manager.save(produtos);
      }

      Object.assign(pedido_entity, pedido as PedidoEntity);

      await manager.save(pedido_entity);
    });
    return pedido_entity;
  }

  async deletarPedido(id: string) {
    const resultado = await this.pedidoRepository.delete({ id });

    if (!resultado.affected) {
      throw new NotFoundException('pedido não encontrado!');
    }
  }
}
