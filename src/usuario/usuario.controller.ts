import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizarUsuarioDTO } from './dto/atualizar-usuario.dto';
import { CriarUsuarioDTO } from './dto/criar-usuario.dto';
import { ListarUsuarioDTO } from './dto/listar-usuario.dto';
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
  async criaUsuario(@Body() usuario: CriarUsuarioDTO) {
    const usuario_entity = await this.usuarioService.criarUsuario(usuario);

    return {
      usuario: { id: usuario_entity.id, nome: usuario_entity.nome },
      messagem: 'usuário criado com sucesso',
    };
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() usuario: AtualizarUsuarioDTO,
  ) {
    await this.usuarioService.atualizaUsuario(id, usuario);

    return {
      messagem: 'usuário atualizado com sucesso',
    };
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    await this.usuarioService.deletaUsuario(id);

    return {
      messagem: 'usuário removido com sucesso',
    };
  }
}
