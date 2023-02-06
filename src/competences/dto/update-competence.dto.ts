import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateCompetenceDto } from './create-competence.dto';

export class UpdateCompetenceDto extends PartialType(CreateCompetenceDto) {

    @IsOptional()
    FrontEnd: boolean;

    @IsOptional()
    BackEnd: boolean;

    @IsOptional()
    FullStack: boolean;

    @IsOptional()
    Runtime: boolean;

    @IsOptional()
    FrameWork: boolean;

}

export default UpdateCompetenceDto;