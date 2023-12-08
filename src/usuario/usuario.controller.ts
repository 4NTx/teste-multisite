import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('api')
export class UsuarioController {
    constructor(private readonly servicoUsuario: UsuarioService) { }

    @Post('registrar')
    async registrar(@Body('nome') nome: string) {
        const usuarioExistente = await this.servicoUsuario.encontrarPorNome(nome);
        if (usuarioExistente) {
            throw new BadRequestException('Usuário já existe.');
        }
        return this.servicoUsuario.criar(nome);
    }

    @Post('login')
    async login(@Body('nome') nome: string) {
        const usuario = await this.servicoUsuario.encontrarPorNome(nome);
        if (!usuario) {
            throw new BadRequestException('Usuário não encontrado.');
        }
        return { idUsuario: usuario.id };
    }
}
