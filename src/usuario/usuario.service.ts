import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listarUsuarios(): Promise<ListarUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    const listaUsuarios = usuarios.map((u) => {
      const usuario = new ListarUsuarioDTO();
      usuario.id = u.id;
      usuario.nome = u.nome;
      return usuario;
    });
    return listaUsuarios;
  }

  async existeComEmail(email: string): Promise<boolean> {
    const possivelUsuario = await this.usuarioRepository.findOneBy({ email });
    return possivelUsuario !== null;
  }

  async criarUsuario(usuarioEntity: UsuarioEntity): Promise<void> {
    await this.usuarioRepository.save(usuarioEntity);
  }

  async atualizaUsuario(
    id: string,
    usuarioAtualizar: AtualizarUsuarioDTO,
  ): Promise<UsuarioEntity | null> {
    await this.usuarioRepository.update(id, usuarioAtualizar);
    return await this.usuarioRepository.findOneBy({ id });
  }

  async deletaUsuario(id: string): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) {
      throw new NotFoundException('usuário não encontrado!');
    }

    await this.usuarioRepository.delete(id);
    return usuario;
  }
}
