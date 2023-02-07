import { IsNotEmpty, IsString } from "class-validator";


export class CreateLangageDto {

    @IsNotEmpty()
    @IsString()
    name: string

}

