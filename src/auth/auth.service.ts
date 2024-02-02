import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-token.interface";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    // Instance for userRepository
    private usersRepository: UsersRepository,
    // Instance for JwtService made available by the JwtModule
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
    // Standard way to return accessToken inside an object
  ): Promise<{ accessToken: string }> {
    // DTO destructuring
    const { username, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { username };
      // accessToken received after signing with the 'jwtService', 'payload' of the token
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException("Please check your login credentials");
    }
  }
}
