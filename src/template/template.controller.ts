import { Controller, Get, Param, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TemplateService } from './template.service';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('api/templates')
export class TemplateController {
    constructor(
        private readonly servicoTemplate: TemplateService,
        private readonly servicoUsuario: UsuarioService
    ) { }

    @Get(':idUsuario')
    async listar(@Param('idUsuario') idUsuario: string) {
        const usuario = await this.servicoUsuario.encontrarPorId(parseInt(idUsuario));

        if (!usuario) {
            throw new NotFoundException('Usuário não encontrado.');
        }

        if (usuario.cargo !== 'admin') {
            throw new ForbiddenException('Acesso negado.');
        }

        return this.servicoTemplate.listarTodos();
    }
}
