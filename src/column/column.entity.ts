import { User } from '../user/user.entity';
import { Card } from '../card/card.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class CardColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne((type) => User, (user) => user.columns)
  user: User;

  @OneToMany((type) => Card, (card) => card.column)
  cards: Card[];
}
