import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {RoleEnum} from "./role.enum";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    role: RoleEnum;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthDate: Date;

    @Column()
    salt: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return  hash === this.password;
    }
}