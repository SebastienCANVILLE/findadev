import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common/decorators';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { FindRelationsNotFoundError } from 'typeorm';
import { AmisService } from './amis.service';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';

@Controller('amis')
export class AmisController {
  constructor(
    private readonly amisService: AmisService,
    private readonly usersService: UsersService,
  ) { };
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  async create(@Param('id') id: string, @Request() req) {
    console.log('test', req.user.userId);
<<<<<<< HEAD
    
    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;
console.log(user,ami);
=======

    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;
    console.log(user, ami);
>>>>>>> 3ef9371f1eb796aa4ec8295bf74ec506faad00b9

    /*  if (user === ami) {
      throw new ConflictException('non valide')
    };
    if (ami === null) {
      throw new NotFoundException('id non trouvé')
    }; */
    console.log(req);
    return await this.amisService.askFriend(user, ami);
  }
  //pour trouver les utilisateurs avec les noms d'utilisateur spécifiés,
  // puis trouve la relation d'amitié entre les 2 users.

  async getRelationAmiStatus(user: string, ami: string) {
    const relationAmi = await this.usersService.findByPseudo(user)
    if (!user || !ami) {
      return 'user pas trouvé';
    }
    if (!relationAmi) {
      return 'pas ami'
    }
    return relationAmi;
  }

  @Get()
  findAll() {
    return this.amisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {

    return this.amisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmiDto: UpdateAmiDto) {
    return this.amisService.update(+id, updateAmiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amisService.remove(+id);
  }
}
