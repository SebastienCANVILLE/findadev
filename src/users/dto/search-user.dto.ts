import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class SearchUserDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    pseudo: string;

    @ApiProperty()
    @IsOptional()
    competences: string;

    @ApiProperty()
    @IsOptional()
    langages: string; 

    @ApiProperty()
    @IsOptional()
    @IsString()
    country: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    region: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    department: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

}