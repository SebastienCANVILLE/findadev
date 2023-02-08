import { Module } from '@nestjs/common';
import { AmisService } from './amis.service';
import { AmisController } from './amis.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AmisController],
  providers: [AmisService, UsersService]
})
export class AmisModule {}
