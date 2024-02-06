import { ConflictException, Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { DatabaseErrorCodes } from "./enums/error-code.enum";
import * as bcrypt from "bcrypt";
import { PrismaService } from "prisma.service";
import { user as userModel } from "@prisma/client";

@Injectable()
export class UsersRepository {
  constructor(private prismaService: PrismaService) {
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
      const result = this.prismaService.user.create({
        data:{
          username: username,
          password: hashedPass,
        }
      });
      return result;
    } catch (err) {
      // check if DB throws error code '23505', this means the username already exist
      if (err.code === DatabaseErrorCodes.uniqueValue) {
        throw new ConflictException(
          `The username:::: '${authCredentialsDto.username}' already exists. Please try with a different username`
        );
      } else throw new Error(err);
    }
  }
}
