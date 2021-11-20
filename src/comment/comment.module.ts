import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from 'src/card/card.module';
import { ColumnModule } from 'src/column/column.module';
import { UserModule } from 'src/user/user.module';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  imports: [
    forwardRef(() => CardModule),
    forwardRef(() => ColumnModule),
    forwardRef(() => UserModule),
    // TypeOrmModule.forFeature([Comment]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
