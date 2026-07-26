import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async listarUsuarios(): Promise<ListarUsuarioDTO[]> {
    const usuarios = await this.usuarioRepository.find();
    const lista_usuarios = usuarios.map((u) => {
      const usuario = new ListarUsuarioDTO();
      usuario.id = u.id;
      usuario.nome = u.nome;
      return usuario;
    });
    return lista_usuarios;
  }

  async existeComEmail(email: string): Promise<boolean> {
    const possivel_usuario = await this.usuarioRepository.findOneBy({ email });
    return possivel_usuario !== null;
  }

  async criarUsuario(usuario: CriarUsuarioDTO) {
    const usuario_entity = new UsuarioEntity();
    Object.assign(usuario_entity, usuario as UsuarioEntity);

    return await this.usuarioRepository.save(usuario_entity);
  }

  async atualizaUsuario(id: string, usuario: AtualizarUsuarioDTO) {
    const usuario_entity = await this.usuarioRepository.findOneBy({ id });

    if (!usuario_entity) {
      throw new BadRequestException('usuário não encontrado');
    }

    Object.assign(usuario_entity, usuario as UsuarioEntity);

    await this.usuarioRepository.save(usuario_entity);
  }

  async deletaUsuario(id: string): Promise<void> {
    const resultado = await this.usuarioRepository.delete(id);

    if (!resultado.affected) {
      throw new NotFoundException('usuário não encontrado!');
    }
  }
}
