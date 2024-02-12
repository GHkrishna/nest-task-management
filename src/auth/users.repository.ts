import { ConflictException, Injectable, Logger } from "@nestjs/common";
// import { DataSource, Repository } from "typeorm";
// import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
// import { DatabaseErrorCodes } from "./enums/error-code.enum";
import * as bcrypt from "bcrypt";
import { PrismaService } from "../../prisma/prisma.service";
import { Prisma, user as userModel } from "@prisma/client";

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService,
    // private prisma = new PrismaClient()
    ) {
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<userModel> {
    try {
      const { username, password } = authCredentialsDto;

      const unHashed = password;
      // Generate salt
      const salt = await bcrypt.genSalt();
      // Hash password using salt
      const hashedPass = await bcrypt.hash(unHashed, salt);

      // Store username and hashed password
      const result = await this.prismaService.user.create({
        data:{
          username: username,
          password: hashedPass,
        }
      });
      return result;
    } catch (err) {
      // check if DB throws error code '23505', this means the username already exist
      console.log("Readcged here:::::")
      if( err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002')
      // Logger.verbose("Error code:::::::", err.code);
      // if (err.code === 'P2002') {
        throw new ConflictException(
          `The username:::: '${authCredentialsDto.username}' already exists. Please try with a different username`
        );
      // } else 
      // throw new Error(err);
    }
  }
}
