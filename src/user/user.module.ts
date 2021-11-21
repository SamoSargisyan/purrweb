import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { CardModule } from '../card/card.module';
import { ColumnModule } from '../column/column.module';

@Module({
  imports: [
    forwardRef(() => CardModule),
    forwardRef(() => ColumnModule),
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
