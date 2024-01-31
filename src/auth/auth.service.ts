import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { DatabaseErrorCodes } from './enums/error-code.enum';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        try{
            return await this.usersRepository.createUser(authCredentialsDto);
        }
        catch(err){
            if(err.code === DatabaseErrorCodes.uniqueValue){
                throw new ConflictException(`The username:::: '${authCredentialsDto.username}' already exists. Please try with a different username`);
            }
            else
            throw new Error(err);
        }
        
    }
}
