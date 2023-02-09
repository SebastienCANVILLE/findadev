import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    usersService: any;
    constructor(private authService: AuthService) {
        super({usernameField: 'pseudo', });

    }

    /** 
     * @method validate :
     * Method permettant de vérifier les informations entrées par l'utilisateur pour se logger.
     * * Une condition pour vérifier la bonne orthographe du pseudo
     * * Une deuxième condition pour vérifier que le pseudo et le password sont les bons 
     */
    async validate(pseudo: string, password: string): Promise<any> {

        const pseudoGoodWrited = await User.findOneBy({pseudo})

        if(pseudoGoodWrited === null){
            throw new HttpException("Mauvais pseudo ou password", HttpStatus.NOT_ACCEPTABLE);
        }

        const user = await this.authService.validateUser(pseudo, password);

        if (!user) {
            throw new UnauthorizedException("Mauvais pseudo ou password");
        }
        return user;
    }
}