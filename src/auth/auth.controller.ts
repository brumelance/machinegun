import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {AuthSignupDto} from "./dto/auth-signup.dto";
import {AuthService} from "./auth.service";
import {AuthSigninDto} from "./dto/auth-signin.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ) {
    }

    @Post('/signup')
    signUp(@Body(ValidationPipe) authSignupDto: AuthSignupDto): Promise<void> {
        return this.authService.signUp(authSignupDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authSigninDto: AuthSigninDto): Promise<{ accesToken: string }> {
        return this.authService.signIn(authSigninDto);
    }
}
