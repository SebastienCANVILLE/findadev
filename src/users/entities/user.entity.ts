import { UserRoleEnum } from 'src/enum/user-role.enum';
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Competence } from 'src/competences/entities/competence.entity';
import { Ami } from 'src/amis/entities/ami.entity';
import { Langage } from 'src/langages/entities/langage.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';


@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    firstname: string;

    @ApiProperty()
    @Column()
    lastname: string;

    @ApiProperty()
    @Column({
        unique: true
    })
    pseudo: string;

    @ApiProperty()
    @Column({
        unique: true
    })
    email: string;

    @ApiProperty()
    @Column()
    @Exclude()
    password: string;

    @ApiProperty()
    @Column()
    adress_line: string;

    @ApiProperty()
    @Column()
    zipCode: string;

    @ApiProperty()
    @Column()
    department: string;

    @ApiProperty()
    @Column()
    city: string;

    @ApiProperty()
    @Column()
    region: string;

    @ApiProperty()
    @Column()
    country: string;

    @ApiProperty()
    @Column()
    presentation: string;

    @ApiProperty()
    @Column()
    @Exclude()
    salt: string;

    @ApiProperty()
    @Column({
        type: 'enum',
        enum: UserRoleEnum,
        default: UserRoleEnum.USER
    })
    @Exclude()
    role: string;

    @ApiProperty()
    @OneToMany(() => Competence, competence => competence.user, { eager: true })
    competences: Competence[]

    @ApiProperty()
    @OneToMany(() => Langage, langage => langage.users, { eager: true })
    langages: Langage[]

    @ApiProperty()
    @OneToMany(() => Ami, ami => ami.user, { eager: true })
    amis: Ami[]
    status: any;

}
