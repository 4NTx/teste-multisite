import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Site } from '../site/site.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column({ default: 'usuario' })
    cargo: string;

    @OneToMany(() => Site, site => site.usuario)
    sites: Site[];

}
