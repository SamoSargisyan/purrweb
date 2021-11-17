import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { Card } from './card/card.entity';
import { CardColumn } from './column/column.entity';
import { Comment } from './comment/comment.entity';
import { User } from './user/user.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: env.DB_HOST,
      port: +env.DB_PORT,
      username: env.DB_USERNAME,
      password: env.DB_PASSWORD,
      database: env.DB_DATABASE,
      entities: [User, CardColumn, Card, Comment],
      synchronize: true,
    }),
  ],
})
export class DataBaseModule {}
