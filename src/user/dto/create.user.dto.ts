import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ReturnUserDTO } from './return.user.dto';

export class CreateUserDTO extends ReturnUserDTO {
  @IsString({ message: 'Must be string' })
  @Length(4, 16, { message: 'Must be from 4 to 16' })
  @IsNotEmpty()
  password: string = null;

  constructor(model: any = {}) {
    super(model);
    this.password = model.password;
  }
}
