import { IsNotEmpty } from "class-validator";
import { IsEmail, IsString } from "class-validator/types/decorator/decorators";

export class LoginUserDto{

    @IsNotEmpty()
    pseudo : string;

    @IsNotEmpty()
    password : string;

}