import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { CreateLangageDto } from './create-langage.dto';

export class UpdateLangageDto extends PartialType(CreateLangageDto) {

    @IsOptional()
    JavaSrispt: boolean;

    @IsOptional()
    React: boolean;

    @IsOptional()
    NodeJs: boolean;

}

export default UpdateLangageDto;