import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {AuthSignupDto} from "./dto/auth-signup.dto";
import {AuthSigninDto} from "./dto/auth-signin.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jswService: JwtService
    ) {}

    async signUp(authSignupDto: AuthSignupDto): Promise<void> {
        return this.userRepository.signUp(authSignupDto);
    }

    async signIn(authSigninDto: AuthSigninDto): Promise<{accesToken: string}> {
        const email = await this.userRepository.signIn(authSigninDto);

        if(!email) {
            throw new UnauthorizedException('Identification invalide');
        }

        const payload = { email };
        const accesToken = await this.jswService.sign(payload);

        return { accesToken };
    }
}
