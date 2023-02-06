import { Module } from '@nestjs/common';
import { ProfilsService } from './profils.service';
import { ProfilsController } from './profils.controller';

@Module({
  controllers: [ProfilsController],
  providers: [ProfilsService]
})
export class ProfilsModule {}
