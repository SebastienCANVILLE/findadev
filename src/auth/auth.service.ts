import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(pseudo: string, password: string): Promise<any> {

        const user = await this.usersService.findByPseudo(pseudo);

        const compareHashPassword = await bcrypt.compare(password, user.password)

        if (user && compareHashPassword) {
            const { password, ...result } = user;
            //console.log(result);
            return result;
        }
        return null;
    }

    async login(user: any) {

        const payload = { pseudo: user.pseudo, id: user.id };

            return {
                statusCode: 200,
                message: 'Bienvenu Mister Président',
                data: {
                    access_token: this.jwtService.sign(payload),
                },
            };

        }
    }

