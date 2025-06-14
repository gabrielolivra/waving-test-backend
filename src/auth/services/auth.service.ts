import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from '../controllers/dtos/auth.dtos';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signIn(data: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = data;

    const userArray = await this.usersService.findOne(email);
    if (!userArray || userArray.length === 0) {
      throw new UnauthorizedException();
    }
    const user = userArray[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      email: user.email,
      username: user.name,
      role: user.role,
    };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '24h',
        secret: process.env.PRIVATE_KEY,
      }),
    };
  }
}
