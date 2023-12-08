import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SiteService } from 'src/site/site.service';
import { SiteModule } from 'src/site/site.module';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), SiteModule],
  providers: [UsuarioService],
  controllers: [UsuarioController],
  exports: [UsuarioService],
})
export class UsuarioModule { }