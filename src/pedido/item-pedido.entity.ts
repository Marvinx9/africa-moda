import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Entity({ name: 'itens_pedidos' })
export class ItemPedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantidade', nullable: false })
  quantidade: number;

  @Column({ name: 'preco_venda', nullable: false })
  preco_venda: number;

  @ManyToOne(() => PedidoEntity, (pedido) => pedido.itens_pedido, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pedido_id' })
  pedido: PedidoEntity;

  @ManyToOne(() => ProdutoEntity, (produto) => produto.itens_pedido, {
    cascade: ['update'],
  })
  @JoinColumn({ name: 'produto_id' })
  produto: ProdutoEntity;
}
