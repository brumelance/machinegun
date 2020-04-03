import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {AuthSignupDto} from "./dto/auth-signup.dto";
import {InternalServerErrorException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {AuthSigninDto} from "./dto/auth-signin.dto";
import {RoleEnum} from "./role.enum";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authSignupDto: AuthSignupDto): Promise<void> {
        const {email, firstName, lastName, birthDate, password} = authSignupDto;

        const user = new User();
        user.email = email;
        user.role = RoleEnum.USER;
        user.firstName = firstName;
        user.lastName = lastName;
        user.birthDate = birthDate;
        user.salt = await bcrypt.genSalt();
        user.password = await UserRepository.hashPassword(password, user.salt);

        try {
            await user.save();
        } catch (error) {
            //Prevent identification of existing user when looking at response
            if (error.code !== '23505') {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(authSigninDto: AuthSigninDto): Promise<string> {
        const { email, password } = authSigninDto;
        const user = await this.findOne({ email });

        if(user && await user.validatePassword(password)) {
            return user.email;
        } else {
            return null;
        }
    }

    private static async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
