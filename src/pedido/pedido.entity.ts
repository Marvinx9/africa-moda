import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { StatusPedido } from './enum/status-pedido.enum';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { ItemPedidoEntity } from './item-pedido.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'valor_total', nullable: false })
  valor_total: number;

  @Column({ name: 'status', enum: StatusPedido, nullable: false })
  status: StatusPedido;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: UsuarioEntity;

  @OneToMany(() => ItemPedidoEntity, (itens_pedido) => itens_pedido.pedido, {
    cascade: true,
  })
  itens_pedido: ItemPedidoEntity[];
}
