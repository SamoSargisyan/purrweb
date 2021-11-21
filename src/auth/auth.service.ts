import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../user/dto/create.user.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { JwtDTO } from './dto/jwt.dto';
import { AuthUserDTO } from './dto/auth.user.dto';
import { Request } from 'express';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  getJwtInHeader(req: Request): string {
    const authHeader = req.headers.authorization;
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
      throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED);
    }

    return token;
  }

  verifyUser(token: string): User {
    return this.jwtService.verify(token);
  }

  generateResponse(user: User): AuthUserDTO {
    const createdUser = new CreateUserDTO(user);

    const tokens: JwtDTO = this.generateToken(user);
    return new AuthUserDTO(createdUser, tokens);
  }

  private generateToken(user: User): JwtDTO {
    const payload = { id: user.id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
