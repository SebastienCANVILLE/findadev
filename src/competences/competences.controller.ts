import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@ApiTags('Competences')
@Controller('Competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) { }

  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto) {
    const createdCompetence = await this.competencesService.createCompetences(createCompetenceDto);
    return {
      statusCode: 201,
      data: "OK",
      message: "Created"
    }
  }

  @Get()
  findAll() {
    const allCompetence = this.competencesService.findAll();
    return {
      statusCode: 200,
      data: "OK",
      message: "All Competence"
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const oneCompetence = this.competencesService.findOne(+id);
    return {
      statusCode: 200,
      data: "OK",
      message: "One Competence"
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompetenceDto: UpdateCompetenceDto) {
    const existingCompetence = await this.competencesService.findOne(id);

    if (!existingCompetence) {
      throw new BadRequestException("Undefined");
    }
    const updatedCompetence = await this.competencesService.update(+id, updateCompetenceDto);
    return {
      statusCode: 201,
      data: "OK",
      message: "Update Competence"
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const existingCompetence = await this.competencesService.findOne(id);

    if (!existingCompetence) {
      throw new BadRequestException("Undefined");
    }
    const deletedCompetence = await existingCompetence.remove();
    return {
      statusCode: 201,
      data: "OK",
      message: "Deleted Competence",
    };
  }
}


