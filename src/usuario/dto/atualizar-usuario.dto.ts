import { PartialType } from '@nestjs/mapped-types';
import { CriarUsuarioDTO } from './criar-usuario.dto';

export class AtualizarUsuarioDTO extends PartialType(CriarUsuarioDTO) {}
