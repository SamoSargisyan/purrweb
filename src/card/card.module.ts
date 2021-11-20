import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnModule } from '../column/column.module';
import { UserModule } from '../user/user.module';
import { CardController } from './card.controller';
import { Card } from './card.entity';
import { CardService } from './card.service';

@Module({
  imports: [
    forwardRef(() => ColumnModule),
    forwardRef(() => UserModule),
    // TypeOrmModule.forFeature([Card]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
