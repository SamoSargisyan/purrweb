import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from '../card/card.module';
import { UserModule } from '../user/user.module';
import { ColumnController } from './column.controller';
import { CardColumn } from './column.entity';
import { ColumnService } from './column.service';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CardModule),
    // TypeOrmModule.forFeature([CardColumn]),
  ],
  providers: [ColumnService],
  controllers: [ColumnController],
  exports: [ColumnService],
})
export class ColumnModule {}
