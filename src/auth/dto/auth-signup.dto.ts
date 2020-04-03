import {IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength} from "class-validator";

export class AuthSignupDto {
    @IsString()
    @IsEmail({}, {message: 'Vous devez entrer un courriel valide'})
    @IsNotEmpty({message: 'Vous devez entrer un courriel'})
    email: string;

    @IsString()
    @IsNotEmpty({message: 'Vous devez entrer un prénom'})
    @MaxLength(20,
        {message: 'Le prénom doit faire au plus 20 caractères'})
    firstName: string;

    @IsString()
    @IsNotEmpty({message: 'Vous devez entrer un nom'})
    @MaxLength(20,
        {message: 'Le nom doit faire au plus 20 caractères'})
    lastName: string;

    @IsString()
    @IsNotEmpty({message: 'Vous devez entrer une date de naissance'})
    birthDate: Date;

    @IsString()
    @MinLength(8,
        {message: 'Le mot de passe doit faire au moins 8 caractères'})
    @MaxLength(30,
        {message: 'Le mot de passe doit faire au plus 30 caractères'})
    @IsNotEmpty({message: 'Vous devez entrer un mot de passe'})
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        {message: 'Le mot de passe doit avoir au moins une majuscule, une minuscule et un chiffre ou caractère spécial pour être valide'})
    password: string;
}