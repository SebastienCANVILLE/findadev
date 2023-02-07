import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetenceDto {

    @IsNotEmpty()
    @IsString()
    name: string

}