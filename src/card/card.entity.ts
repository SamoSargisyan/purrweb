import { CardColumn } from '../column/column.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

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
}
