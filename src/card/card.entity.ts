import { CardColumn } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Card {
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
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => CardColumn, (column) => column.cards)
  column: CardColumn;

  @OneToMany((type) => Comment, (comments) => comments.card)
  comments: Comment;
}
