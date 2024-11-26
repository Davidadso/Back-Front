import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/create-auth.dto';
import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ userName, email, password, idRol }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (!idRol) {
      idRol = 2;
    }

    try {
        const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = await this.usersService.create({
      userName,
      email,
      idRol,
      password: hashedPassword,
    });

    // Genera el token
    const payload = {
      email: newUser.email,
      userName: newUser.userName,
      id_rol: newUser.idRol,
    };
    const token = await this.jwtService.signAsync(payload);

    // Devuelve el token y el nombre del usuario
    return {
      message: 'User registered successfully',
      userName: newUser.userName,
      token,
    };
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException('Error al registrar el usuario');
    }
  }

  async login({ userName, email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }
    const isPassWordValid = await bcryptjs.compare(password, user.password);
    if (!isPassWordValid) {
      throw new UnauthorizedException('password is wrong');
    }

    const payload = {
      email: user.email,
      userName: user.userName,
      idRol: user.idRol,
      password: user.password,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };
  }

  async profile({ email, id_rol }: { email: string; id_rol: number }) {
    /* if (id_rol == 2) {
      throw new UnauthorizedException(
        'You are not authorized to access this route',
      );
    } */
    return await this.usersService.findOneByEmail(email);
  }
}
