import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '8h',
      },
    }),
    // JwtService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
