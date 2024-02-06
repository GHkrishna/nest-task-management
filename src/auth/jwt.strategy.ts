import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { JwtPayload } from "./interfaces/jwt-token.interface";
import { UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "prisma.service";

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private prismaService: PrismaService,
    private configService: ConfigService
  ) {
    // Tells PassportStrategy the secretOrKey and where to get jwtFromRequest
    super({
      secretOrKey: configService.get("JWT_SECRET"),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // validate function to validate if the username in the token, once decrypted, actually exist
  // This function is called each time an authorised endpoint is accessed
  async validate(payload: JwtPayload): Promise<any> {
    const { username } = payload;
    const user = await this.prismaService.user.findUnique({ 
      where: {username} 
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
