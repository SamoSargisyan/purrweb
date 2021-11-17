import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from 'src/card/card.entity';
import { User } from 'src/user/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  text: string;

  @ManyToOne((type) => Card, (card) => card.comments)
  card: Card;

  @ManyToOne((type) => User, (author) => author.comments)
  author: User;
}
