import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateCompetenceDto } from './create-competence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {

    @ApiProperty()
    @IsOptional()
    name: string

}

export default UpdateCompetenceDto;