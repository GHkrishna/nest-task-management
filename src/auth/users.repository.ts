import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { DatabaseErrorCodes } from './enums/error-code.enum';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        try{
        const { username, password } = authCredentialsDto;


        const unHashed = password;
        const salt = await bcrypt.genSalt()
        const hashedPass = await bcrypt.hash(unHashed, salt);

        const query = this.create({
            username: username,
            password: hashedPass,
        })

        const result = await this.save(query);
        return result;
    }
        catch(err){
            if(err.code === DatabaseErrorCodes.uniqueValue){
                throw new ConflictException(`The username:::: '${authCredentialsDto.username}' already exists. Please try with a different username`);
            }
            else
            throw new Error(err);
        }
    }

    async getDetails(authCredentialsDto: AuthCredentialsDto){

    }
}