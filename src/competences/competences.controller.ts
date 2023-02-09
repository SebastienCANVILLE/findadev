import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';



@ApiTags('Competences')
@Controller('Competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService) { }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCompetenceDto: UpdateCompetenceDto) {
    const existingCompetence = await this.competencesService.findOne(id);

    if (!existingCompetence) {
      throw new BadRequestException("Not Found");
    }
    const updatedCompetence = await this.competencesService.update(+id, updateCompetenceDto);
    return {
      statusCode: 201,
      data: "OK",
      message: "Update Competence"
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const existingCompetence = await this.competencesService.findOne(id);

    if (!existingCompetence) {
      throw new BadRequestException("Not Found");
    }
    const deletedCompetence = await existingCompetence.remove();
    return {
      statusCode: 201,
      data: "OK",
      message: "Deleted Competence",
    };
  }
}