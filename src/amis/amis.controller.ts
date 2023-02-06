import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AmisService } from './amis.service';
import { CreateAmiDto } from './dto/create-ami.dto';
import { UpdateAmiDto } from './dto/update-ami.dto';

@Controller('amis')
export class AmisController {
  constructor(private readonly amisService: AmisService) {}

  @Post()
  create(@Body() createAmiDto: CreateAmiDto) {
    return this.amisService.create(createAmiDto);
  }

  @Get()
  findAll() {
    return this.amisService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.amisService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAmiDto: UpdateAmiDto) {
    return this.amisService.update(+id, updateAmiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.amisService.remove(+id);
  }
}
