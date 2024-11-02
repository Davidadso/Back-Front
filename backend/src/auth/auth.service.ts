import {
  BadRequestException,
  Injectable,
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
    private  readonly jwtService: JwtService,

  ) {}

  async register({ userName, email, password }: RegisterDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      throw new BadRequestException('User already exists');
    } else {
      return this.usersService.create({
        userName,
        email,
        password: bcryptjs.hashSync(password, 10),
      });
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


    const  payload = { email : user.email, userName  : user.userName};

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email
    }
  }
}
