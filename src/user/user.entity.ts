import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CardColumn } from '../column/column.entity';
import { Comment } from '../comment/comment.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => CardColumn, (columns) => columns.user)
  columns: CardColumn;

  @OneToMany((type) => Comment, (comments) => comments.author)
  comments: Comment;
}
