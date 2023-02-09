import { Injectable } from '@nestjs/common';
import { remove } from 'lodash';
import { async } from 'rxjs';
import { Any } from 'typeorm';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { Langage } from './entities/langage.entity';

@Injectable()
export class LangagesService {
  create(createLangageDto: CreateLangageDto) {
    throw new Error('Method not implemented.');
  }
  async createLangages(createLangageDto:
    CreateLangageDto )
    : Promise<Langage> {
    const langage = new Langage();
    langage.name = createLangageDto.name;
    return await langage.save();
    }

  async findAll() {
    return await Langage.find();
  }

  async findOne(id: number) { 
    return await Langage.findOneBy({id});
  }

  async update(id: number, updateLangageDto: UpdateLangageDto | any): Promise<Langage>{
    const newLangage = await Langage.save(updateLangageDto);
    return await Langage.findOneBy({id});
    }
  

  async remove(id: number | any) {
    const langage = await Langage.findOneBy({id});
    if (langage) {
      await Langage.remove(langage);
    }
    }
  }
  

