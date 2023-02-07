import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto): Promise<User> { // Promise (promet de te renvoyer un user)

    if (createUserDto.password !== createUserDto.password_confirm){
      throw new ConflictException("Mots de passe non identiques")
    }
    
    const user = User.create(createUserDto)
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    await user.save()
    delete user.password
    delete user.salt
    return user
    
  }

  async findAll() { // recherche de tous les users
    return await User.find();
  }

  async findOne(id: number) { // recherche d'un user par id
    return await User.findBy({ id });
  }

  async findByName(pseudo: string) {  // plus besoin de faire de login car notre recherche passe par le username cf(userController)
    return await User.findOneBy({ pseudo }); //à tester
  }

  async remove(id: number) { // permet la suppression de l'user par l'id    
    return await User.delete({ id });
  }
}