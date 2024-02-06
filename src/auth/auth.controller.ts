import { Body, Controller, Get, Logger, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/authCredentials.dto";
import { User } from "./user.entity";
// import { AuthGuard } from "@nestjs/passport";
// import { Request } from "express";
import { TestDto } from "./dto/test.dto";
import { ValidateNested } from "class-validator";
import { isValid } from "./sample/custom-validations";
import { NestedArrayDto, NestedDto } from "./dto/test-nested.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("signup")
  @ApiBody({type:AuthCredentialsDto})
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return await this.authService.signUp(authCredentialsDto);
  }

  @Get("signin")
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }

  // ref = 'abc'
  // @Validate(isValidTitle)
  // @Type(() => String)
  // title: string;

  // Service endpoint for testing auth
  @Get("test")
  // @UseGuards(AuthGuard())
  test(
    // @Req() req: Request,
    @Body() a: NestedDto
    ) {
      // this.a = a;
      Logger.verbose(`This is the number more than five:::: ${JSON.stringify(a)}`);
    // console.log(req);
  }


  @Get("nested-test")
  nestedTest(
    @Body() body: NestedArrayDto
  ){
    Logger.verbose(`This is the body of 'nested-test':::: ${JSON.stringify(body)}`);
  }
}
