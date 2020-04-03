import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class AuthSigninDto {
    @IsString()
    @IsEmail({}, {message: 'Vous devez entrer un courriel valide'})
    @IsNotEmpty({message: 'Vous devez entrer un courriel'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Vous devez entrer un mot de passe'})
    password: string;
}