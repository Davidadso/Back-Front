import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';9
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Auth } from './decorators/auth.decorator';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

interface RequestWithUser extends Request {
  user: {
    email: string;
    idRol: number;
  };
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    console.log(registerDto);
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      console.error(error);
      return {
        message: 'Error en registrar el usuario',
        errors: [],
      };
    }
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

 

  @Get('profile')
  @Auth([1 ,2 ,3])
  async profile(@ActiveUser() user: UserActiveInterface) {
    console.log(user)
    return await this.authService.profile(user);
  }
}
