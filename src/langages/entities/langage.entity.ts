import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';

@Entity()
export class Langage extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    JavaSrispt: boolean;

    @Column()
    React: boolean;

    @Column()
    NodeJs: boolean;

    @ManyToOne(type => Langage, langage => langage.user)
    langages: Langage[];
}
