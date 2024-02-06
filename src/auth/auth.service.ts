import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersRepository } from "./users.repository";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./interfaces/jwt-token.interface";
import { PrismaService } from "../../prisma.service";
import { DatabaseErrorCodes } from "./enums/error-code.enum";
// import { Prisma, PrismaClient } from '@prisma/client/edge'
import { user as userModel } from "@prisma/client";



// Old-> Using Repository factory type

@Injectable()
export class AuthService {
  prisma: any;
  constructor(
    private readonly usersRepository: UsersRepository,
    // Instance for JwtService made available by the JwtModule
    private jwtService: JwtService
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<userModel> {
    return await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto
    // Standard way to return accessToken inside an object
  ): Promise<{ accessToken: string }> {
    // DTO destructuring

    const { username, password } = authCredentialsDto;
    const user = await this.prisma.user.findUnique({
      where:{ username: username }
    });

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












// @Injectable()
// export class AuthService {
//   // const prisma = new PrismaClient();
//   constructor(
//     private readonly prisma: PrismaService,
//     // Instance for JwtService made available by the JwtModule
//     private jwtService: JwtService
//   ) {}

//   async signUp(authCredentialsDto: AuthCredentialsDto): Promise<any> {
//     try {
//       const { username, password } = authCredentialsDto;

//       const unHashed = password;
//       // Generate salt
//       const salt = await bcrypt.genSalt();
//       // Hash password using salt
//       const hashedPass = await bcrypt.hash(unHashed, salt);

//       // Store username and hashed password
//       // const query = this.create({
//       //   username: username,
//       //   password: hashedPass,
//       // });

//       // const result = await this.save(query);
//       const result = this.prisma.user.create({
//         data: {
//           username: username,
//           password: hashedPass,
//         },
//       });
//       return result;
//     } catch (err) {
//       // check if DB throws error code '23505', this means the username already exist
//       if (err.code === DatabaseErrorCodes.uniqueValue) {
//         throw new ConflictException(
//           `The username:::: '${authCredentialsDto.username}' already exists. Please try with a different username`
//         );
//       } else throw new Error(err);
//     }
//     // return await this.prisma.user.create()
//     // return await this.usersRepository.createUser(authCredentialsDto);
//   }

//   async signIn(
//     authCredentialsDto: AuthCredentialsDto
//     // Standard way to return accessToken inside an object
//   ): Promise<{ accessToken: string }> {
//     // DTO destructuring
//     const { username, password } = authCredentialsDto;
//     const user = await this.prisma.user.findUnique({
//       where:{ username: username }
//     });

//     if (user && (await bcrypt.compare(password, user.password))) {
//       const payload: JwtPayload = { username };
//       // accessToken received after signing with the 'jwtService', 'payload' of the token
//       const accessToken: string = await this.jwtService.sign(payload);
//       return { accessToken };
//     } else {
//       throw new UnauthorizedException("Please check your login credentials");
//     }
//   }
// }
