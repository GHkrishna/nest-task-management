import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./interfaces/jwt-token.interface";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ){
        super({
            secretOrKey: 'topSecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User>{
        const { username } = payload;
        const user = await this.usersRepository.findOneBy({username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}