import { Module } from '@nestjs/common';
import { AmisService } from './amis.service';
import { AmisController } from './amis.controller';

@Module({
  controllers: [AmisController],
  providers: [AmisService]
})
export class AmisModule {}
