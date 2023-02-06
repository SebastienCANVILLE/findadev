import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfilsService } from './profils.service';
import { CreateProfilDto } from './dto/create-profil.dto';
import { UpdateProfilDto } from './dto/update-profil.dto';

@Controller('profils')
export class ProfilsController {
  constructor(private readonly profilsService: ProfilsService) {}

  @Post()
  create(@Body() createProfilDto: CreateProfilDto) {
    return this.profilsService.create(createProfilDto);
  }

  @Get()
  findAll() {
    return this.profilsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profilsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfilDto: UpdateProfilDto) {
    return this.profilsService.update(+id, updateProfilDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profilsService.remove(+id);
  }
}
