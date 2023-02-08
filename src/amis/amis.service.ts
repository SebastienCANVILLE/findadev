import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RelationId } from 'typeorm';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';
import { Ami } from './entities/ami.entity';


@Injectable()
export class AmisService {
  userService: any;
  existingRelationAmi: any;
  async askFriend(id: number): Promise<void> {
  
    const user = await this.userService.findOneById(id);
    const ami = await this.userService.findOneById(id);
    
    if (!user || !ami) {
      throw new BadRequestException('User ou ami pas trouvé');
    }
  
    const existingRelationAmi = await this.userService.findOne({
      where: [
        { user, ami: ami },
        { user: ami, ami: user }
      ]
    });
    
    if (existingRelationAmi) {
      throw new BadRequestException('relation ami existe déjà');
    }
    const relationAmi = new existingRelationAmi();
    relationAmi.user = user;
    relationAmi.ami = ami;
    relationAmi.askFriendRequest = 'envoi demande';
    
    await this.existingRelationAmi.save(relationAmi);
  };

  async findAll() {
    return await Ami.find();
  }

  async findOne(id: number) {
    return await Ami.findOneBy({id:id});
  }

  update(id: number, updateAmiDto: UpdateAmiDto) {
    return `This action updates a #${id} ami`;
  }

  remove(id: number) {
    return `This action removes a #${id} ami`;
  }
}
