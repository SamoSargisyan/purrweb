import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';
import { ColumnModule } from './column/column.module';
import { UserGuard } from './user/user.guards';
import { AuthModule } from './auth/auth.module';
import { DataBaseModule } from './database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigService,
    AuthModule,
    DataBaseModule,
    UserModule,
    CommentModule,
    CardModule,
    ColumnModule,
  ],
  controllers: [AppController],
  providers: [
    DataBaseModule,
    AppService,
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
  ],
})
export class AppModule {}
