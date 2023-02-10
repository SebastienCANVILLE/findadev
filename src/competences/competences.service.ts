import { Injectable } from '@nestjs/common';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';
import { Competence } from './entities/competence.entity';

@Injectable()
export class CompetencesService {
  async createCompetences(userLog, createCompetenceDto: CreateCompetenceDto): Promise<Competence> {

    const newCompetence = new Competence();
    newCompetence.name = createCompetenceDto.name
    newCompetence.user = userLog
    newCompetence.save();
    return newCompetence;
  }

  async findAll(): Promise<Competence[]> {
    return await Competence.find(); // ou return await Competence.find({relations: {user: true}}); si on veut la relation User.
  }

  async findOne(id: number): Promise<Competence> {
    /* return await Competence.findOneBy({ id }) // */ return await Competence.findOne({ relations: { user: true }, where: { id } })
  }

  async update(id: number, updateCompetenceDto: UpdateCompetenceDto): Promise<Competence> {
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