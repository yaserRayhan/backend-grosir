import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SHA1 } from 'crypto-js';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findEmail(email);
    if (user == null) {
      return {
        access_token: null,
        message: 'Email tidak terdaftar',
        status: 404,
      };
    }
    if (SHA1(pass).toString() !== user.password) {
      return {
        access_token: null,
        message: 'Password salah',
        status: 401,
      };
    }
    const payload = {
      id: user.id,
      username: user.username,
      level: user.level,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      message: 'Login berhasil',
      status: 200,
    };
  }
}
