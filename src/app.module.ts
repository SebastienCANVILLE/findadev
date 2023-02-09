import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompetencesModule } from './competences/competences.module';
import { AmisModule } from './amis/amis.module';
import { LangagesModule } from './langages/langages.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Competence } from './competences/entities/competence.entity';
import { Langage } from './langages/entities/langage.entity';
import { Ami } from './amis/entities/ami.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Competence, Langage, Ami],
      synchronize: true,
      logging: false,
    }),
    UsersModule, CompetencesModule, AmisModule, LangagesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { constructor(private dataSource: DataSource) { } }
