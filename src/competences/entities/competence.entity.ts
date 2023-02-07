import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Competence extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    FrontEnd: boolean;

    @Column()
    BackEnd: boolean;

    @Column()
    FullStack: boolean;

    @Column()
    RunTime: boolean;

    @Column()
    FrameWork: boolean;

    @ManyToOne(type => Competence, competence => competence.user)
    competences: Competence[];

}