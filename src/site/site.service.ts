import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Site } from './site.entity';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class SiteService {
    constructor(
        @InjectRepository(Site)
        private repositorioSite: Repository<Site>,
    ) { }

    async criar(nome: string, html: string, css: string, js: string, usuarioId: number): Promise<Site> {
        const siteExistente = await this.repositorioSite.findOne({ where: { usuario: { id: usuarioId } } });

        if (siteExistente) {
            siteExistente.html = html;
            siteExistente.css = css;
            siteExistente.js = js;
            siteExistente.nome = nome;
            return this.repositorioSite.save(siteExistente);
        } else {
            const site = this.repositorioSite.create({ nome, html, css, js, usuario: { id: usuarioId } });
            return this.repositorioSite.save(site);
        }
    }

    async lerTemplatePadrao(): Promise<{ html: string; css: string; js: string }> {
        const caminhoBase = path.join(__dirname, '../template/defaults');
        const html = await fs.readFile(path.join(caminhoBase, 'default.html'), 'utf8');
        const css = await fs.readFile(path.join(caminhoBase, 'default.css'), 'utf8');
        const js = await fs.readFile(path.join(caminhoBase, 'default.js'), 'utf8');

        return { html, css, js };
    }

    async listarPorUsuario(usuarioId: number): Promise<Site[]> {
        return this.repositorioSite.find({ where: { usuario: { id: usuarioId } } });
    }

    async encontrarPorId(id: number): Promise<Site | undefined> {
        return this.repositorioSite.findOne({ where: { id } });
    }

    async atualizar(id: number, html: string, css: string, js: string): Promise<Site> {
        const site = await this.repositorioSite.findOne({ where: { id } });
        if (!site) throw new Error('Site não encontrado');

        site.html = html;
        site.css = css;
        site.js = js;
        return this.repositorioSite.save(site);
    }

    async deletar(id: number): Promise<void> {
        await this.repositorioSite.delete(id);
    }

    async publicar(siteId: number): Promise<Site> {
        const site = await this.repositorioSite.findOne({ where: { id: siteId } });
        if (!site) throw new Error('Site não encontrado');

        site.publicado = true;
        return this.repositorioSite.save(site);
    }

    async criarSitePadrao(usuarioId: number): Promise<Site> {
        const { html, css, js } = await this.lerTemplatePadrao();
        return this.criar("Site Padrão", html, css, js, usuarioId);
    }
}