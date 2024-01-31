import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return await this.usersRepository.createUser(authCredentialsDto);        
    }
}
