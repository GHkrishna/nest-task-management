import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
// import {compare} from 'bcrypt';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return await this.usersRepository.createUser(authCredentialsDto);        
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string>{
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOneBy({username});

        if(user && await bcrypt.compare(password, user.password)){
            return 'success';
        }
        else{
            throw new UnauthorizedException("Please check your login credentials");
        }
    }
}
