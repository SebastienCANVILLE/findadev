export class CreateLangageDto { }
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Langage } from '../entities/langage.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    JavaScrispt: boolean;

    @Column({ default: false })
    React: boolean;

    @Column({ default: false })
    NodeJs: boolean;

    @ManyToOne(type => Langage, langage => langage.user)
    langages: Langage[];
}