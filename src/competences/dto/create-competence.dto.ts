export class CreateCompetenceDto { }
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
//import { Competence } from '../entities/competence.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: false })
    FrontEnd: boolean;

    @Column({ default: false })
    BackEnd: boolean;

    @Column({ default: false })
    FullStack: boolean;

    @Column({ default: false })
    RunTime: boolean;

    @Column({ default: false })
    FrameWork: boolean;

}