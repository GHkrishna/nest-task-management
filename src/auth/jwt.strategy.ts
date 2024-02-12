import { PassportStrategy } from "@nestjs/passport";
// import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
// import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./interfaces/jwt-token.interface";
import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
// import { User } from "./user.entity";
// import { user as userModel } from "@prisma/client";
// import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prismaService: PrismaService,
    // private configService: ConfigService 
  ) {
    // Tells PassportStrategy the secretOrKey and where to get jwtFromRequest
    super({
      // secretOrKey: configService.get("JWT_SECRET"),
      secretOrKey: "topSecret",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  // validate function to validate if the username in the token, once decrypted, actually exist.
  // This function is called each time an authorised endpoint is accessed
  async validate(payload: JwtPayload): Promise<any> {
    const { username } = payload;
    let userResult: any;
    try{
      userResult = await this.prismaService.user.findFirst({ 
        where: {username} 
      });
    }
    catch(err){
      console.log(err);
    }

    if(!userResult) {
      throw new UnauthorizedException();
    }

    Logger.verbose(":::::::::::Reached here:::::::::::")
    Logger.verbose(":::::::::::userResult:::::::::::", userResult)
    return userResult;
  }
}
