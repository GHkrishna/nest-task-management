import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/authCredentials.dto';
import { User } from './user.entity';

@Controller('user')
export class AuthController {

    constructor(private authService: AuthService){}
    
    @Post('create')
    async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User>{
        return await this.authService.signUp(authCredentialsDto);
    }
}
