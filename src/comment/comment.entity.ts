import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Card } from 'src/card/card.entity';
import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
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
  text: string;

  @ManyToOne((type) => Card, (card) => card.comments)
  card: Card;

  @ManyToOne((type) => User, (author) => author.comments)
  author: User;
}
