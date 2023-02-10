import { Module } from '@nestjs/common';
import { LangagesService } from './langages.service';
import { LangagesController } from './langages.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [LangagesController],
  providers: [LangagesService, UsersService]
})
export class LangagesModule {}
