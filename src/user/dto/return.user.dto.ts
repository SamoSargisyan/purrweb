import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserDTO {
  @ApiProperty({
    description: 'User`s email',
    example: 'JohnDoe@mail.ru',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @ApiProperty({
    description: 'User`s name',
    example: 'John Doe',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  @IsNotEmpty()
  readonly username: string;

  constructor(model: any = {}) {
    this.email = model.email;
    this.username = model.username;
  }
}
