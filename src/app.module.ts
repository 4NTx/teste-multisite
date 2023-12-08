import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { Site } from './site/site.entity';
import { Template } from './template/template.entity';
import { TemplateModule } from './template/template.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: '4ntz',
      password: 'chgeRahQzjA]@tap',
      database: 'testesite',
      entities: [Usuario, Site, Template],
      synchronize: true,
    }),
    UsuarioModule, TemplateModule, SiteModule
  ],
})
export class AppModule { }
