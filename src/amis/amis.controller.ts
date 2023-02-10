import { Controller, Get, Post, Body, Patch, Param, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { Query, Req, Request, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { ConflictException, NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { AmisService } from './amis.service';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';


@UseInterceptors(ClassSerializerInterceptor)
@Controller('amis')
export class AmisController {
  friendshipRepository: any;
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
    console.log(req);
    return await this.amisService.askFriend(user, ami);
  }
}
  /*   const existingFriendship = await this.usersService.findOne({
      where: [
        { user, ami: ami },
        { user: ami, ami: user }
      ]
    });
    
    if (existingFriendship) {
      throw new ConflictException('Friendship already exists');
    }
  } */


  /*   
    const friendship = new Friendship();
    friendship.user = user;
    friendship.ami = friend;
    friendship.friendRequest = 'sent';
    
    await this.friendshipRepository.save(friendship); */
  
 /*    const user = await this.usersService.findUserByID(req.user.userId)//req.user.userId;
    const ami = await this.usersService.findUserByID(+id)//req.ami.amiId;
    console.log(user, ami);

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
    // Verifier si la relation n'existe pas déjà
    //  si exist => error
    
    console.log(req);
    return await this.amisService.askFriend(user, ami);

  } */

 /*  @Patch('amis')
   update(@Body() updateUserDto: UpdateUserDto, @Req() req) {

    const userLog = req.user.userId
    const updateUser = await this.usersService.update(userLog, updateUserDto,);


    return {
      statusCode: 201,
      message: 'Les modifications ont bien été prises en compte',
      data: {
        updateUser,
      },
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.amisService.removeAmi();
    await this.amisService.remove(+id);
  }
    */

