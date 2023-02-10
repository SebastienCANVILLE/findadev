import { BadRequestException, Injectable } from '@nestjs/common';
import { Http2ServerRequest } from 'http2';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RelationId } from 'typeorm';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';
import { Ami } from './entities/ami.entity';


@Injectable()
export class AmisService {
  save(existingRelationAmi: User[]) {
    throw new BadRequestException('la relation existe déjà .');
  }
  amiService: any;
  usersService: any;
  removeAmi() {
    throw new Error('suppression non autorisée.');
  }
 
  async askFriend(user:User,ami:User): Promise<Ami> {
  
    if (!user || !ami) {
      throw new BadRequestException('User ou ami pas trouvé');
    }
   
    const relationAmi = new Ami();
    relationAmi.user = user;
    relationAmi.ami = ami;
    
    await this.usersService.save(relationAmi);
    return await relationAmi.save();
    
  };
  //pour trouver les utilisateurs avec les noms d'utilisateur spécifiés,
  // puis trouve la relation d'amitié entre les 2 users.

/*   async getRelationAmiStatus(user: string, ami: string) {
    const relationAmi = await this.amiService.findByUserPseudo(user,ami)
    if (!user || !ami) {
      return 'user pas trouvé';
    }
    if (!relationAmi) {
      return 'pas ami'
    }
    return relationAmi;
  } */

  
  async findAll() {
    return await Ami.find();
  }

  async findOne(id: number) {
    return await Ami.findOneBy({ id: id })
  }
  async update(id: number, updateAmiDto: UpdateAmiDto) {
    await Ami.update(id, updateAmiDto)
    return this.findOne(id)
  }

  async remove(id: number) {
    const dataDeleted = Ami.findBy({ id });
    await Ami.delete(id);
    if (dataDeleted) {
      return dataDeleted;
    }
    return undefined;
  }
}
