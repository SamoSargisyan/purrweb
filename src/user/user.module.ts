import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, AuthService],
  exports: [UserService, AuthService, JwtModule],
})
export class UserModule {}
