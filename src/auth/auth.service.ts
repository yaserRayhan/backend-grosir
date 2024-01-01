import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    if (SHA1(pass).toString() !== user.password) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: user.id,
      username: user.username,
      level: user.level,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
