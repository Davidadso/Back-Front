import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body()
    registerDto: RegisterDto,
  ) {
    console.log(registerDto);
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      console.error(error)
      return {
        message: 'error en registrar el usuario',
        errors: []
      }
    }
  }

  @Post('login')
  login(
    @Body()
    loginDto : LoginDto, 
  ) {
    return this.authService.login(loginDto);
  }

  @Get('profile')
  profile(){
    
  }
}
