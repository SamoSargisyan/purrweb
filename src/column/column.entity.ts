import { User } from '../user/user.entity';
import { Card } from '../card/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CardColumn {
  @ApiProperty({
    example: '1',
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Hello World',
    type: String,
  })
  @Column({ nullable: false })
  name: string;

  @ManyToOne((type) => User, (user) => user.columns)
  user: User;

  @OneToMany((type) => Card, (card) => card.column)
  cards: Card[];
}
