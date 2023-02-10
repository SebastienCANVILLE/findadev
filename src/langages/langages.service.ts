import { Injectable } from '@nestjs/common';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { Langage } from './entities/langage.entity';

@Injectable()
export class LangagesService {

  async createLangages(userLog, createLangageDto: CreateLangageDto): Promise<Langage>{

    const newLangage = new Langage();
    newLangage.name = createLangageDto.name;
    newLangage.users = userLog
    newLangage.save();
    return newLangage;
  }

  async findAll(): Promise<Langage[]> {
    return await Langage.find();
    
  }

  async findOne(id: number): Promise<Langage> { 
    return await Langage.findOne({relations: { users: true }, where: { id }
  })
}

  async update(id: number, updateLangageDto: UpdateLangageDto | any): Promise<Langage>{
    const newLangage = await Langage.update(id, updateLangageDto);

    if (newLangage){
      return await Langage.findOneBy({id});
    };
    return undefined;
  }
  

  async remove(id: number | any) {
    const langages = await Langage.remove(id);
    if (langages) {
      return `This action removes a #${id} langage`;
    };
    return undefined;
  }

}

