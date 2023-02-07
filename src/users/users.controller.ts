import { Controller, Get, Post, Body, Param, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Patch, UseInterceptors } from '@nestjs/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';


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
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get('search/:pseudo')
  async findByPseudo(@Param('pseudo') pseudo: string) {  // à tester  
    return await this.usersService.findByPseudo(pseudo);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
