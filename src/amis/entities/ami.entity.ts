import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { ApiProperty, ApiTags } from "@nestjs/swagger";


@ApiTags('amis')
@Entity('amis')
export class Ami extends BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column({default: false})
    isFriend: boolean

    @ApiProperty()
    @ManyToOne(() => User, user => user.amis)
    user: User;

    @ApiProperty()
    @ManyToOne(() => User, user => user.amis)
    ami: User;
  askFriend: string;

}
