import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor, HttpStatus } from '@nestjs/common';
import { Put, Query, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { BadRequestException, ConflictException, HttpException, NotFoundException } from '@nestjs/common/exceptions';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { remove, update } from 'lodash';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AmisService } from './amis.service';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';


@ApiTags()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('amis')

export class AmisController {
  constructor(
    private readonly amisService: AmisService,
    private readonly usersService: UsersService,
  ) { };

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiProperty()

  async findRelationAmiByID(@Param('id') id: string, @Request() req) {

    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;

    const relationAmiExist = await this.amisService.findRelationAmiByID(user.id, ami.id);

    if (!relationAmiExist) {
      throw new HttpException("La relation ami n'existe pas", HttpStatus.NOT_FOUND);
    }


    return relationAmiExist;

  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @ApiProperty()
  async create(@Param('id') id: string, @Request() req) {
    console.log('test', req.user.userId);


    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;
    console.log(user, ami);
    const relationAmi = await this.amisService.findRelationAmiByID(user.id, ami.id)


    if (ami === req.user.userId) {
      throw new ConflictException('non valide')
    };

    if (ami === null) {
      throw new NotFoundException('id non trouvé')
    };

    if (!user || !ami) {
      throw new NotFoundException('User or friend not found');
    }

    if (user.id === ami.id) {
      throw new ConflictException('Cannot send friend request to yourself');

    }
    if (relationAmi) {
      throw new ConflictException('Friendship already exists');
    }

    console.log(req);
    return await this.amisService.askFriend(user, ami);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiProperty()
  async removeRelationAmi(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findUserByID(req.user.userId);
    const ami = await this.usersService.findUserByID(+id);
    console.log(user, ami);
    const relationAmi = await this.amisService.findRelationAmiByID(user.id, ami.id);

    if (!relationAmi) {
      return { statusCode: 404, message: 'Relation ami introuvable' };
    }
    await this.amisService.removeRelationAmi(relationAmi.id);
    return { statusCode: 200, message: 'relation ami supprimée' };
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateRelationAmi(@Request() req, @Param('id') id: string) {
    const user = await this.usersService.findUserByID(req.user.userId);
    const ami = await this.usersService.findUserByID(+id);
    console.log(user, ami);
    const relationAmi = await this.amisService.findRelationAmiByID(user.id, ami.id);

    if (!relationAmi) {
      return { statusCode: 404, message: 'Relation ami introuvable' };
    }

    await this.amisService.updateRelationAmi(+id);
    return { statusCode: 200, message: 'Relation ami mise à jour' };
  }

  @ApiProperty()
  async deletedAmi(@Req() req) {
    const id = req.user.userId
    const ami = await this.amisService.findOneById(+id);

    if (!ami) {
      throw new HttpException(`L'ami demandé n'existe pas`, HttpStatus.NOT_FOUND);
    }
    const deleted = await this.amisService.remove(id);
    if (!deleted) {
      throw new HttpException('Erreur Server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { message: `L'ami a bien été supprimé` };
  }

}








