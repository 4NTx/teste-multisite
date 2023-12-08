import { Controller, Post, Get, Put, Delete, Param, Body, NotFoundException, Res } from '@nestjs/common';
import { SiteService } from './site.service';
import { Site } from './site.entity';

@Controller('api/sites')
export class SiteController {
    constructor(private readonly servicoSite: SiteService) { }

    @Post()
    async criar(@Body() dadosCriacaoSite: { nome: string; html: string; css: string; js: string; usuarioId: number }) {
        return this.servicoSite.criar(dadosCriacaoSite.nome, dadosCriacaoSite.html, dadosCriacaoSite.css, dadosCriacaoSite.js, dadosCriacaoSite.usuarioId);
    }

    @Get(':usuarioId')
    async listarPorUsuario(@Param('usuarioId') usuarioId: string) {
        return this.servicoSite.listarPorUsuario(parseInt(usuarioId));
    }

    @Get(':siteId')
    async obterDetalhes(@Param('siteId') siteId: string) {
        const site = await this.servicoSite.encontrarPorId(parseInt(siteId));
        if (!site) throw new NotFoundException('Site não encontrado');
        return site;
    }

    @Put(':siteId')
    async atualizar(@Param('siteId') siteId: string, @Body() dadosAtualizacao: { html: string; css: string; js: string }) {
        return this.servicoSite.atualizar(parseInt(siteId), dadosAtualizacao.html, dadosAtualizacao.css, dadosAtualizacao.js);
    }

    @Delete(':siteId')
    async deletar(@Param('siteId') siteId: string) {
        await this.servicoSite.deletar(parseInt(siteId));
        return { message: 'Site deletado com sucesso' };
    }

    @Get(':siteId/ver')
    async servirSite(@Param('siteId') siteId: string): Promise<string> {
        const site = await this.servicoSite.encontrarPorId(parseInt(siteId));
        if (!site) {
            throw new NotFoundException('Site não encontrado');
        }

        return this.montarPaginaSite(site);
    }

    montarPaginaSite(site: Site): string {
        return `
        <!DOCTYPE html>
        <html lang="pt">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${site.nome}</title>
          <style>${site.css}</style>
        </head>
        <body>
          ${site.html}
          <script>${site.js}</script>
        </body>
        </html>
      `;
    }
}
