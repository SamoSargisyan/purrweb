import { IsString, Length } from 'class-validator';
import { User } from 'src/user/user.entity';

export class CreateCommentsDTO {
  @IsString({ message: 'Must be string' })
  @Length(1, 256, { message: 'Must be from 1 to 256' })
  readonly text: string;

  readonly author: User;
}
