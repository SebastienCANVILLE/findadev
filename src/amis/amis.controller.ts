import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { Request, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { FindRelationsNotFoundError } from 'typeorm';
import { AmisService } from './amis.service';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';

@UseInterceptors(ClassSerializerInterceptor)
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
    

    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;
    console.log(user, ami);
    
    if (user === ami) {
      throw new ConflictException('non valide')
    };

    if (ami === null) {
      throw new NotFoundException('id non trouvé')
    };
    // Verifier si la relation n'existe pas déjà
    //  si exist => error

    

    console.log(req);
    return await this.amisService.askFriend(user, ami);
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
