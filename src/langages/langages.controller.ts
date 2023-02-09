import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { LangagesService } from './langages.service';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';

@ApiTags('Competences')
@Controller('Competences')
export class LangagesController {
  constructor(private readonly langagesService: LangagesService) { }

  @Post()

  async create(@Body() createLangageDto: CreateLangageDto) {
    const createdLangage = await 
    this.langagesService.create(createLangageDto);
    return createdLangage;
  }

  @Get()
  async findAll() {
    const langages = await this.langagesService.findAll();
    return langages;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const langage = await this.langagesService.findOne(+id);
    return langage;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLangageDto: UpdateLangageDto) {
    const updatedLangage = await this.langagesService.update(+id, updateLangageDto);
    return updatedLangage;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedLangage = await this.langagesService.remove(+id);
    return deletedLangage;
  }
}


