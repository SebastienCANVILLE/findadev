import { UserRoleEnum } from 'src/enum/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Competence } from 'src/competences/entities/competence.entity';
import { Ami } from 'src/amis/entities/ami.entity';
import { Langage } from 'src/langages/entities/langage.entity';


@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    firstname: string;

    @Column()
    lastname: string;

    @Column({
        unique: true
    })
    pseudo: string;

    @Column()
    email: string;

    @Column()
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
    salt: string;

    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    role: string;

    /* @OneToMany(() => Competence, competence => competence.users)
    competences: Competence[]

    @OneToMany(() => Langage, langage => langage.users)
    langages: Langage[]

    @OneToMany(() => Ami, ami => ami.users) //{ eager: true }
    amis: Ami[] */

}
