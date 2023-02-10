import { Controller, Get, Post, Body, Param, Delete, ClassSerializerInterceptor, HttpException, HttpStatus, ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBody, ApiParam, ApiProperty } from '@nestjs/swagger';

/**@class UsersController
 * 
 * Une class permettant :
 * * De réunir plusieurs méthodes liées à l'accessibilité du client.
 * * De contrôler les informations entrantes, de les vérifier avant de les envoyer en base de données, suivant un protocole précis et renseigné.
 * * Celle-ci est dédiée à la création de comptes, à la recherche via des critères, à la modifification de données et à la suppression d'un compte dévellopeur.
 */
@UseInterceptors(ClassSerializerInterceptor) // permet de cacher les données lors d'une requête (password etc...)
@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /** 
   * @method create :
   * 
   * Une méthode permettant de :
   * * Controler les données entrantes lors de la création d'un compte client.
   * * Vérifier et imposer que les contraintes soient bien respectées.
   * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
   */
  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {

    if (createUserDto.password !== createUserDto.password_confirm) {
      throw new ConflictException("Mots de passe non identiques")
    }

    const pseudoExist = await this.usersService.findByPseudo(createUserDto.pseudo);

    if (pseudoExist) {
      throw new HttpException("Le pseudo est déjà attribué", HttpStatus.BAD_REQUEST);
    }

    const emailExist = await this.usersService.findByEmail(createUserDto.email);

    if (emailExist) {
      throw new HttpException("L'Email déjà utilisé", HttpStatus.BAD_REQUEST);
    }

    return await this.usersService.create(createUserDto);


  }

  /** 
  * @method findAll :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de tous les développeurs.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get()
  async findAll() {

    const userExist = await this.usersService.findAll();

    if (!userExist) {
      throw new HttpException("L'utilisateur n'existe pas", HttpStatus.NOT_FOUND);
    }

    return userExist;
  }

  /** 
   * @method findUserByID :
   * 
   * Une méthode permettant de :
   * * Controler les données entrantes lors de la consultation d'un développeurs via son id.
   * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  */
  @Get(':id')
  findUserByID(@Param('id') id: string) {

    const userExist = this.usersService.findUserByID(+id);

    if (!userExist) {
      throw new NotFoundException("L'utilisateur n'existe pas");
    }
    return userExist;
  }

  /** 
  * @method findUserByPseudo :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation d'un développeurs via son pseudo.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  */
  @Get('search/:pseudo')
  async findByPseudo(@Param('pseudo') pseudo: string) {

    const pseudoExist = await this.usersService.findByPseudo(pseudo);

    if (!pseudoExist) {

      throw new HttpException("Le pseudo n'existe pas", HttpStatus.NOT_FOUND);
    }

    return pseudoExist;
  }

  /** 
  * @method findByCountry :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de tous les développeurs par pays.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get('country/:country')
  async findByCountry(@Param('country') country: string) {

    const countryExist = await this.usersService.findByCountry(country);

    if (countryExist.length === 0) {

      throw new HttpException("Pas de développeur dans ce pays", HttpStatus.NOT_FOUND);
    }

    return countryExist;
  }

  /** 
  * @method findByCity :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de tous les développeurs par ville.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get('city/:city')
  async findByCity(@Param('country') city: string) {

    const cityExist = await this.usersService.findByCity(city);

    if (cityExist.length === 0) {

      throw new HttpException("Pas de développeur dans cette", HttpStatus.NOT_FOUND);
    }

    return cityExist;
  }

  /** 
  * @method findByDepartment :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de tous les développeurs par département.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get('department/:department')
  async findByDepartment(@Param('department') department: string) {

    const departmentExist = await this.usersService.findByDepartment(department);

    if (departmentExist.length === 0) {

      throw new HttpException("Pas de développeur dans ce département", HttpStatus.NOT_FOUND);
    }

    return departmentExist;
  }

  /** 
  * @method findByRegion :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation de tous les développeurs par région.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get('region/:region')
  async findByRegion(@Param('region') region: string) {

    const regionExist = await this.usersService.findByRegion(region);

    if (regionExist.length === 0) {

      throw new HttpException("Pas de développeur dans cette région", HttpStatus.NOT_FOUND);
    }

    return regionExist;
  }

  /** 
  * @method findUserByEmail :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la consultation d'un développeur via son email.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès..
  */
  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {

    const emailExist = await this.usersService.findByEmail(email);

    if (!emailExist) {

      throw new HttpException("L'Email n'existe pas", HttpStatus.NOT_FOUND);
    }

    return emailExist;
  }

  /** 
  * @method update :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la modification du profil par un développeur.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * Le développeur doit être loger pour modifier son profil. Il ne peut modifier le profil d'un autre
  */
  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req) {

    const userLog = req.user.userId
    const updateUser = await this.usersService.update(userLog, updateUserDto,);

    return {
      statusCode: 201,
      message: 'Les modifications ont bien été prisent en compte',
      data: {
        updateUser,
      },
    };
  }

  /** 
  * @method deletedUser :
  * 
  * Une méthode permettant de :
  * * Controler les données entrantes lors de la suppression du profil par un développeur.
  * * Renvoyer un message d'avertissement en cas d'erreur ou de succès.
  * * Le développeur doit être loger pour pouvoir supprimer son profil. Il ne peut modifier le profil d'un autre
  */
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deletedUser(@Req() req) {

    const id = req.user.userId

    const user = await this.usersService.findUserByID(id);

    if (!user) {
      throw new HttpException(`L'user demandé n'existe pas`, HttpStatus.NOT_FOUND);
    }

    const deleted = await this.usersService.deletedUser(id);

    if (!deleted) {
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return { message: `Le compte a bien été supprimé` };
  }
}