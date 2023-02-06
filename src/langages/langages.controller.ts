import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LangagesService } from './langages.service';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';

@Controller('langages')
export class LangagesController {
  constructor(private readonly langagesService: LangagesService) {}

  @Post()
  create(@Body() createLangageDto: CreateLangageDto) {
    return this.langagesService.create(createLangageDto);
  }

  @Get()
  findAll() {
    return this.langagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.langagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLangageDto: UpdateLangageDto) {
    return this.langagesService.update(+id, updateLangageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langagesService.remove(+id);
  }
}
