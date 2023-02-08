import { Controller, Get, Post, Body, Param, Delete, ClassSerializerInterceptor, NotFoundException, HttpException, HttpStatus, ParseIntPipe } from '@nestjs/common';
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
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }


  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get(':id')
  findUserByID(@Param('id') id: string) {
    
    const userExist = this.usersService.findUserByID(+id);

    if (!userExist) {
      throw new NotFoundException ("L'utilisateur n'existe pas");
    }
    return userExist;
    
  }

  @Get('search/:pseudo')
  async findByPseudo(@Param('pseudo') pseudo: string) {  // à tester  
    return await this.usersService.findByPseudo(pseudo);
  }


  @UseGuards(JwtAuthGuard)
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto, @Req()req) {

    
    const userLog = req.user.userId

    const updateUser = await this.usersService.update(userLog, updateUserDto,);
    
  
    return{
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