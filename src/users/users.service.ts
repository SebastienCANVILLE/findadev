import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfo } from 'os';

@Injectable()
export class UsersService {

  async create(createUserDto: CreateUserDto): Promise<User> { // Promise (promet de te renvoyer un user)

    if (createUserDto.password !== createUserDto.password_confirm) {
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

  async findAll(): Promise<User[]> { // recherche de tous les users
    return await User.find();
  }

  async findOne(id: number) { // recherche d'un user par id
    return await User.findOneBy({ id });
  }

  async findByPseudo(pseudo: string) {  // recherche par pseudo
    return await User.findOneBy({ pseudo });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {

    const updateUser = await User.findOneBy({ id: id });

    updateUser.pseudo = updateUserDto.pseudo;
    updateUser.adress_line = updateUserDto.adress_line;
    updateUser.zipCode = updateUserDto.zipCode;
    updateUser.city = updateUserDto.city;
    updateUser.department = updateUserDto.department;
    updateUser.country = updateUserDto.country;
    updateUser.region = updateUserDto.region;
    updateUser.presentation = updateUserDto.presentation;

    await User.save(updateUser);

    return updateUser
  }

  async deletedUser(id: number): Promise<User> { // permet la suppression de l'user par l'id

    const dataDeleted = await User.findOneBy({ id })
    await User.delete({ id });

    if (dataDeleted) {
      return dataDeleted ;
    }
    
    return undefined;
  }

}