import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastname: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    pseudo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password_confirm: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    adress_line: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    department: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    region: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    presentation: string;

}
