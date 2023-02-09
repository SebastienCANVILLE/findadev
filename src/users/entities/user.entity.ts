import { UserRoleEnum } from 'src/enum/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Competence } from 'src/competences/entities/competence.entity';
import { Ami } from 'src/amis/entities/ami.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Exclude } from 'class-transformer';


@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    pseudo: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column()
    adress_line: string;

    @Column()
    zipCode: string;

    @Column()
    department: string;

    @Column()
    city: string;

    @Column()
    region: string;

    @Column()
    country: string;

    @Column()
    presentation: string;

    @Column()
    @Exclude()
    salt: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    @Exclude()
    role: string;

    @OneToMany(() => Competence, competence => competence.users, { eager: true })
    competences: Competence[]

    @OneToMany(() => Langage, langage => langage.users, { eager: true })
    langages: Langage[]

    @OneToMany(() => Ami, ami => ami.user, { eager: true })
    amis: Ami[]
    status: any;

}
