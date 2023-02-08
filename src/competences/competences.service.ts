import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';


@Injectable()
export class CompetencesService {
  async createCompetences(createCompetenceDto: CreateCompetenceDto | any): Promise<Competence> {
    const newCompetence = await Competence.save(createCompetenceDto);
    return newCompetence;
  }

  async findAll() {
    return await Competence.find();
  }

  async findOne(id: number): Promise<Competence> {
    return await Competence.findOneBy({ id })
  }

  async update(id: number, updateCompetenceDto: UpdateCompetenceDto | any): Promise<Competence> {
    const newCompetence = await Competence.update(id, updateCompetenceDto);

    if (newCompetence) {
      return await Competence.findOneBy({ id });
    };
    return undefined;
  };

  async remove(id: number | any) {
    const competence = await Competence.remove(id);
    if (competence) {
      return `This action removes a #${id} competence`;
    };
    return undefined;
  }
}