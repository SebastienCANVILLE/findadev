import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateLangageDto } from './create-langage.dto';

export class UpdateLangageDto extends PartialType(CreateLangageDto) {

    @ApiProperty()
    @IsOptional()
    name: string

}

export default UpdateLangageDto;