import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @Post('signup')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return await this.authService.signUp(authCredentialsDto);
    }

    @Get('signin')
    async signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string>{
        return await this.authService.signIn(authCredentialsDto);
    }
}
