import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateAmiDto } from './create-ami.dto';

export class UpdateAmiDto extends PartialType(CreateAmiDto) {

    @ApiProperty()
    @IsOptional()
    id: number

    @ApiProperty()
    @IsOptional()
    friendRequest: string

    @ApiProperty()
    @IsOptional()
    reponse: string

}