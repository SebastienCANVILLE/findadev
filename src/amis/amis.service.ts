import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { RelationId } from 'typeorm';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';
import { Ami } from './entities/ami.entity';


@Injectable()
export class AmisService {
  async askFriend(user:User,ami:User): Promise<Ami> {
  
    if (!user || !ami) {
      throw new BadRequestException('User ou ami pas trouvé');
    }
   
    const relationAmi = new Ami();
    relationAmi.user = user;
    relationAmi.ami = ami;
    
    return await relationAmi.save();
    
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
