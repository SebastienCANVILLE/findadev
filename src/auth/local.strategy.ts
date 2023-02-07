import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();

    }

    async validate(pseudo: string, password: string): Promise<any> {

        const user = await this.authService.validateUser(pseudo, password);

        if (!user) {
            throw new UnauthorizedException("Requête refuser");
        }
        return user;
    }
}