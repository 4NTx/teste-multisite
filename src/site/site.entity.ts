import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Entity('sites')
export class Site {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column("text")
    html: string;

    @Column("text")
    css: string;

    @Column("text")
    js: string;

    @ManyToOne(() => Usuario, usuario => usuario.sites)
    usuario: Usuario;

    @Column({ default: false })
    publicado: boolean;

}
