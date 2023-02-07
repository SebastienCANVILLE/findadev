import { IsNotEmpty } from "class-validator";
import { IsEmail, IsString } from "class-validator/types/decorator/decorators";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    firstname: string;

    @IsNotEmpty()
    @IsString()
    lastname: string;

    @IsNotEmpty()
    @IsString()
    pseudo: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    password_confirm: string;

    @IsNotEmpty()
    @IsString()
    adress_line: string;

    @IsNotEmpty()
    @IsString()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    department: string;

    @IsNotEmpty()
    @IsString()
    city: string;

    @IsNotEmpty()
    @IsString()
    region: string;

    @IsNotEmpty()
    @IsString()
    country: string;

    @IsNotEmpty()
    @IsString()
    presentation: string;

}
