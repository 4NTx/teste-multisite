import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './template.entity';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template)
        private repositorioTemplate: Repository<Template>,
    ) { }

    async listarTodos(): Promise<Template[]> {
        return this.repositorioTemplate.find();
    }
}
