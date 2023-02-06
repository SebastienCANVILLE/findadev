import { Module } from '@nestjs/common';
import { LangagesService } from './langages.service';
import { LangagesController } from './langages.controller';

@Module({
  controllers: [LangagesController],
  providers: [LangagesService]
})
export class LangagesModule {}
