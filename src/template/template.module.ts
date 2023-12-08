import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './template.entity';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
    imports: [TypeOrmModule.forFeature([Template]), UsuarioModule],
    providers: [TemplateService],
    controllers: [TemplateController],
})
export class TemplateModule { }
