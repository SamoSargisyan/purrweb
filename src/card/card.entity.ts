import { CardColumn } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => CardColumn, (column) => column.cards)
  column: CardColumn;

  @OneToMany((type) => Comment, (comments) => comments.card)
  comments: Comment;
}
