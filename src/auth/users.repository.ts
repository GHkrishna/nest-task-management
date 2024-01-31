import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";

@Injectable()
export class UsersRepository extends Repository<User>{
    constructor(private dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User>{
        const { username, password } = authCredentialsDto;

        const query = this.create({
            username: username,
            password: password,
        })

        const result = await this.save(query);
        return result;
    }
}