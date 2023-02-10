import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";

@Entity('amis')
export class Ami extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({default: false})
    isFriend: boolean

    @ManyToOne(() => User, user => user.amis)
    user: User;

    @ManyToOne(() => User, user => user.amis)
    ami: User;
  askFriend: string;

}
