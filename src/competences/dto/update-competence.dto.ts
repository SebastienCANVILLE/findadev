import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCompetenceDto } from './create-competence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {

    @IsOptional()
    name: string

}

export default UpdateCompetenceDto;