import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards, Req, ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CompetencesService } from './competences.service';
import { CreateCompetenceDto } from './dto/create-competence.dto';
import { UpdateCompetenceDto } from './dto/update-competence.dto';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Competences')
@Controller('Competences')
export class CompetencesController {
  constructor(private readonly competencesService: CompetencesService,
    private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCompetenceDto: CreateCompetenceDto, @Req() req) {
    // récupère l'id du user connecté
    const userIdLog = req.user.userId;

    // récupère l'ensemble de user connecté (nom, prénom, adresse etc)
    const userLog = await this.usersService.findUserByID(userIdLog)

    // modifie les données qui vont servir à créer la compétence (ajoute le user)
    // createCompetenceDto.user = userLog

    // créé la compétence en envoyant les données entrantes (createCompetenceDto) + l'ensemble du userLog
    const createdCompetence = await this.competencesService.createCompetences(userLog, createCompetenceDto);
    return {
      statusCode: 201,
      data: createdCompetence,
      message: "Created"
    }
  }

  @Get()
  async findAll() {
    const allCompetence = await this.competencesService.findAll();
    return {
      statusCode: 200,
      data: allCompetence,
      message: "All Competence"
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const oneCompetence = await this.competencesService.findOne(+id);

    return {
      statusCode: 200,
      data: oneCompetence,
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
      data: updatedCompetence,
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
      data: deletedCompetence,
      message: "Deleted Competence",
    };
  }
}