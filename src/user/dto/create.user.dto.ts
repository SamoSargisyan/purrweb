import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ReturnUserDTO } from './return.user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO extends ReturnUserDTO {
  @ApiProperty({
    description: 'User`s password',
    example: 'NewPassword1',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be from 4 to 16' })
  @IsNotEmpty()
  password: string = null;

  constructor(model: any = {}) {
    super(model);
    this.password = model.password;
  }
}
