import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Get("signin")
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  // Service endpoint for testing auth
  @Get("test")
  @UseGuards(AuthGuard())
  test(@Req() req: Request) {
    console.log(req);
  }
}
