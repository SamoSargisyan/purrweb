import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardsModule } from '../card/card.module';
import { UserModule } from '../user/user.module';
import { ColumnsController } from './column.controller';
import { CardColumn } from './column.entity';
import { ColumnsService } from './column.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CardsModule),
    TypeOrmModule.forFeature([CardColumn]),
  ],
  providers: [ColumnsService],
  controllers: [ColumnsController],
  exports: [ColumnsService],
})
export class ColumnsModule {}
