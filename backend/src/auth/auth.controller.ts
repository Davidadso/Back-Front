import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { Request } from 'express';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Auth } from './decorators/auth.decorator';

interface RequestWithUser extends Request {
  user: {
    email: string;
    id_rol: number;
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

  /* @Get('profile')
  @Roles(1)
  @UseGuards(AuthGuard, RolesGuard)
  profile(@Req() req: Request & { user: { email: string; id_rol: number } }) {
    return this.authService.profile({
      email: req.user.email,
      id_rol: req.user.id_rol,
    });
  } */

  @Get('profile')
  @Auth(1)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
