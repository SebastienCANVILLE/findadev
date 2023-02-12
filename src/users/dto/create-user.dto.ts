import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, Length } from "class-validator";


export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    firstname: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    lastname: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    pseudo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Length(1)
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    password_confirm: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    adress_line: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    zipCode: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    department: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    region: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(1)
    presentation: string;

}
