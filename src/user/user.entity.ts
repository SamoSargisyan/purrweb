import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CardColumn } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';
import { ApiProperty } from '@nestjs/swagger';
@Entity()
export class User {
  @ApiProperty({
    example: '1',
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User`s email',
    example: 'JohnDoe@mail.ru',
    type: String,
  })
  @Column({ nullable: false, unique: true })
  email: string;

  @ApiProperty({
    description: 'User`s password',
    example: 'NewPassword1',
    type: String,
  })
  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => CardColumn, (columns) => columns.user)
  columns: CardColumn;

  @OneToMany((type) => Comment, (comments) => comments.author)
  comments: Comment;
}
