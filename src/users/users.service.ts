import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { UpdateUserDto } from './dto/update-user.dto';


/**@class UsersService
 * Une class permettant de gérer les requêtes SQL de plusieurs méthodes CRUD.
*/
@Injectable()
export class UsersService {
  askFriend(user: User, ami: User) {
    throw new Error('Method not implemented.');
  }

  /** 
    * @method create :
    * Method permettant de créer un utlisateur suivant le modèle du CreatUserDto.
    * * Crypter le password grâce au hash/bcrypt lors de la création du compte client.
    */
  async create(createUserDto: CreateUserDto): Promise<User> { // Promise (promet de te renvoyer un user)

    const user = User.create(createUserDto)
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(createUserDto.password, user.salt);
    await user.save()
    delete user.password
    delete user.salt
    return user

  }

  /** 
    * @method findAll :
    * Method permettant de rechercher tous utlisateurs.
    */
  async findAll(): Promise<User[]> { // recherche de tous les users
    return await User.find();
  }

  /** 
  * @method findAll :
  * Method permettant de rechercher tous utlisateurs.
  */
  async findUserByID(id: number): Promise<User> { 
    return await User.findOneBy({ id: id })

  }

  /** 
  * @method findByPseudo :
  * Method permettant de rechercher tous un développeur par son pseudo.
  */
  async findByPseudo(pseudo: string) { 
    return await User.findOneBy({ pseudo });
  }

  /** 
  * @method findByCountry :
  * Method permettant de rechercher tous les dévellopeurs d'un pays.
  */
  async findByCountry(country: string) { 
    return await User.find({ where: { country: country } });
  }

  /** 
  * @method findByCity :
  * Method permettant de rechercher tous les développeurs d'une ville.
  */
  async findByCity(city: string) {  
    return await User.find({ where: { city: city } });
  }

  /** 
  * @method findByDepartment :
  * Method permettant de rechercher tous les développeurs d'un département.
  */
  async findByDepartment(department: string) {  
    return await User.find({ where: { department: department } });
  }

  /** 
  * @method findByRegion :
  * Method permettant de rechercher tous les développeurs d'une région.
  */
  async findByRegion(region: string) {  
    return await User.find({ where: { region: region } });
  }

  /** 
  * @method findByEmail :
  * Method permettant de rechercher un utlisateurs via son email.
  */
  async findByEmail(email: string) { 
    return await User.findOneBy({ email });
  }

  /** 
  * @method update :
  * Method permettant de metttre à jour son profil via un template définit par UpdateUserDto.
  */
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

  /** 
  * @method deletedUser :
  * Method permettant de supprimer l'utlisateur connecté.
  * Avec cette méthode impossible qu'un utilisateur puisse supprimer un autre utilisateur via son id
  */
  async deletedUser(id: number): Promise<User> { // permet la suppression de l'user par l'id

    const dataDeleted = await User.findOneBy({ id })
    await User.delete({ id });

    if (dataDeleted) {
      return dataDeleted;
    }

    return undefined;
  }

}