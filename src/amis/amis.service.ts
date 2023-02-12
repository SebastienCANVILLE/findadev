import { Injectable, Param } from '@nestjs/common';
import { Delete, UseGuards } from '@nestjs/common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { identity } from 'lodash';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RelationId } from 'typeorm';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';
import { Ami } from './entities/ami.entity';


@Injectable()

export class AmisService {

  amisService: any;
  removeRelationAmi: any;
  findOneById: any;
  findAmiByID: any;
  deletedAmi: any;
  //pour trouver les utilisateurs avec les noms d'utilisateur spécifiés,
  // puis trouve la relation d'amitié entre les 2 users.
  @ApiProperty()

  async askFriend(user: User, ami: User): Promise<Ami> {
    const relationAmi = new Ami();
    relationAmi.user = user;
    relationAmi.ami = ami;

    return await relationAmi.save();

  };

  @ApiProperty()

  // permet de trouver la relation ami
  async findRelationAmiByID(userId: number, amiId: number) {
    return await Ami.findOneBy({ user: { id: userId }, ami: { id: amiId } })
  }

  //listes des relations amis
  @ApiProperty()
  async findAll() {
    return await Ami.find();
  }

  //mise a jour des demandes
  @ApiProperty()
  async update(id: number) {
    const relationAmi = await this.amisService.findOneBy({ id });
    relationAmi.accepted = true;
    return relationAmi.save()
  }

  // mise a jour des relations amis
  @ApiProperty()
  async updateRelationAmi(id: number,): Promise<Ami> {
    const updateRelationAmi = await Ami.findOneBy({ id: id });
    await Ami.save(updateRelationAmi);

    return updateRelationAmi
  }

  //suppression d'une relation par Id
  @UseGuards(JwtAuthGuard)
  @ApiProperty()
  async remove(@Param() id: string) {
    const relationAmiDeleted = await Ami.delete(id);
    await this.amisService.remove(id);
    if (relationAmiDeleted) {
      return relationAmiDeleted;
    }
    return undefined;
  }
}

