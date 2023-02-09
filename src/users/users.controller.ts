import { Controller, Get, Post, Body, Param, Delete, ClassSerializerInterceptor, NotFoundException, HttpException, HttpStatus, ParseIntPipe, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseInterceptors(ClassSerializerInterceptor) // permet de cacher les données lors d'une requête (password etc...)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


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


  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  @Get(':id')
  async findUserByID(@Param('id') id: string) {

    const userExist = await this.usersService.findUserByID(+id);

    if (!userExist) {

      throw new HttpException("L'utilisateur n'existe pas", HttpStatus.NOT_FOUND);
    }

    return userExist;

  }


  @Get('search/:pseudo')
  async findUserByPseudo(@Param('pseudo') pseudo: string) {

    const pseudoExist = await this.usersService.findByPseudo(pseudo);

    if (!pseudoExist) {

      throw new HttpException("Le pseudo n'existe pas", HttpStatus.NOT_FOUND);
    }

    return pseudoExist;
  }


  @Get('country/:country')
  async findByCountry(@Param('country') country: string) {

    const countryExist = await this.usersService.findByCountry(country);

    if (!countryExist) {

      throw new HttpException("Pas de développeur dans ce pays", HttpStatus.NOT_FOUND);
    }

    return countryExist;
  }







  @Get('email/:email')
  async findUserByEmail(@Param('email') email: string) {

    const userExist = await this.usersService.findByEmail(email);

    if (!userExist) {

      throw new HttpException("L'Email n'existe pas", HttpStatus.NOT_FOUND);
    }

    return userExist;
  }




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