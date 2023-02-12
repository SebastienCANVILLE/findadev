import { BadRequestException, ConflictException, Injectable, Param } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RelationId } from 'typeorm';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';
import { Ami } from './entities/ami.entity';


@Injectable()

export class AmisService {
 
  amiService: any;
  amisService: any;
  removeRelationAmi: any;
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

  @ApiProperty()
  async findAll() {
    return await Ami.find();
  }

 
   @ApiProperty()
  async update(id: number, updateAmiDto: UpdateAmiDto): Promise<Ami> {
    const updateAmi = await Ami.findOneBy({ id: id });
/* 
    updateAmi.pseudo = updateAmiDto.pseudo;
    updateAmi.adress_line = updateAmiDto.adress_line;
    updateAmi.zipCode = updateAmiDto.zipCode;
    updateAmi.city = updateAmiDto.city;
    updateAmi.department = updateAmiDto.department;
    updateAmi.country = updateAmiDto.country;
    updateAmi.region = updateAmiDto.region;
    updateAmi.presentation = updateAmiDto.presentation;

    await Ami.save(updateAmi); */

    return updateAmi
  } 

  @ApiProperty()
  async remove(@Param() userPseudo: string, amiPseudo: string) {
     const relationAmiDeleted = await Ami.find();
      await this.amisService.deleteByPseudo(userPseudo,amiPseudo);
      if (relationAmiDeleted) {
        return relationAmiDeleted;
      }
      return undefined;
    } 
  }

