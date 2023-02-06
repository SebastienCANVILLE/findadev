import { Injectable } from '@nestjs/common';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';

@Injectable()
export class AmisService {
  create(createAmiDto: CreateAmiDto) {
    return 'This action adds a new ami';
  }

  findAll() {
    return `This action returns all amis`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ami`;
  }

  update(id: number, updateAmiDto: UpdateAmiDto) {
    return `This action updates a #${id} ami`;
  }

  remove(id: number) {
    return `This action removes a #${id} ami`;
  }
}
