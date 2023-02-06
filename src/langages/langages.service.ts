import { Injectable } from '@nestjs/common';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';

@Injectable()
export class LangagesService {
  create(createLangageDto: CreateLangageDto) {
    return 'This action adds a new langage';
  }

  findAll() {
    return `This action returns all langages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} langage`;
  }

  update(id: number, updateLangageDto: UpdateLangageDto) {
    return `This action updates a #${id} langage`;
  }

  remove(id: number) {
    return `This action removes a #${id} langage`;
  }
}
