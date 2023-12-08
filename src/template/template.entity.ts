import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('template')
export class Template {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    descricao: string;
}
