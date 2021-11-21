import { IsString, Length } from 'class-validator';
import { User } from 'src/user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentsDTO {
  @ApiProperty({
    description: 'User`s comment',
    example: 'New angry comment',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  @Length(1, 256, { message: 'Must be from 1 to 256' })
  readonly text: string;

  @ApiProperty({
    description: 'User',
    example: '...',
    type: User,
  })
  readonly author: User;
}
