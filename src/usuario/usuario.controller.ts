import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { ApiOkResponse } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get()
  @ApiOkResponse({ isArray: true, type: ListarUsuarioDTO })
  async listUsuarios() {
    return await this.usuarioService.listarUsuarios();
  }

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriarUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosDoUsuario.email;
    usuarioEntity.senha = dadosDoUsuario.senha;
    usuarioEntity.nome = dadosDoUsuario.nome;
    usuarioEntity.id = uuid();

    await this.usuarioService.criarUsuario(usuarioEntity);

    return {
      usuario: { id: usuarioEntity.id, nome: usuarioEntity.nome },
      messagem: 'usuário criado com sucesso',
    };
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizarUsuarioDTO,
  ) {
    const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
      id,
      novosDados,
    );

    return {
      usuario: usuarioAtualizado,
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

    return {
      usuario: usuarioRemovido,
      messagem: 'usuário removido com suceso',
    };
  }
}
