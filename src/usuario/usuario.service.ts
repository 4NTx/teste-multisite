import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { SiteService } from 'src/site/site.service';


@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private repositorioUsuario: Repository<Usuario>,
    private siteService: SiteService,
  ) { }

  async criar(nome: string): Promise<Usuario> {
    const usuario = this.repositorioUsuario.create({ nome });
    const usuarioSalvo = await this.repositorioUsuario.save(usuario);
    await this.siteService.criarSitePadrao(usuarioSalvo.id);
    return usuarioSalvo;
  }

  async encontrarPorNome(nome: string): Promise<Usuario | undefined> {
    return this.repositorioUsuario.findOne({ where: { nome } });
  }

  async encontrarPorId(id: number): Promise<Usuario | undefined> {
    return this.repositorioUsuario.findOne({ where: { id } });
  }
}
