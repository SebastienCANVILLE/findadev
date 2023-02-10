import { Controller, Get, Post, Body, Patch, Param, Delete,BadRequestException, UseGuards, Req, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LangagesService } from './langages.service';
import { CreateLangageDto } from './dto/create-langage.dto';
import { UpdateLangageDto } from './dto/update-langage.dto';
import { UsersService } from 'src/users/users.service';

@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('langages')
@Controller('langages')
export class LangagesController {
  constructor(private readonly langagesService: LangagesService,
  private readonly usersService: UsersService){ }

  @UseGuards(JwtAuthGuard)
  @Post()
 
  async create(@Body() createLangageDto: CreateLangageDto, @Req() req) {
    const userIdLog = req.user.userID;

    const userlog = await 
    this.usersService.findUserByID(userIdLog)

    const createdLangage = await
    this.langagesService.createLangages(userlog,createLangageDto);
    return{
      statusCode: 201,
      data: createdLangage,
      message: "Created"
    }
  }
  

  @Get()
  async findAll() {
    const allLangages = await this.langagesService.findAll();
    return {
      statusCode:  200,
      data: allLangages,
      message: "All Langages"
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const onelangage = await this.langagesService.findOne(+id);
    return{
      statusCode:  201,
      data: onelangage,
      message: "One langage"
    }
  }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')

async update(
  @Param("id") id: number,
  @Body() updateLangageDto: UpdateLangageDto) {
    const existingLangage = await this.langagesService.findOne(id);
    //if (existingLangage == null) {
    if (!existingLangage) {
    throw new Error("Langage not found");
  }
  const updateLangage = await this.langagesService.update(+id, updateLangageDto);
  return{
    statusCode:  201,
    data: updateLangage,
    message: "Update Langage"
  }
  }

  @UseGuards(JwtAuthGuard)
  @Post()

  async remove(@Param('id') id: number) {
    const existingLangage = await this.langagesService.findOne(id);

    if (!existingLangage) {
    throw new Error("Langage not found");
  }
  const deletedLangage = await existingLangage.remove();
  return{
    statusCode:  201,
    data: deletedLangage,
    message: "Deleted Langage"
  }
  }
}

