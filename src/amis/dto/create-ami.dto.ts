import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAmiDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    friendRequest: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reponse: string

}