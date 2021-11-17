import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ReturnUserDTO {
  @IsString({ message: 'Must be string' })
  @IsEmail({}, { message: 'Must be email' })
  readonly email: string;

  @IsString({ message: 'Must be string' })
  @IsNotEmpty()
  readonly username: string;

  constructor(model: any = {}) {
    this.email = model.email;
    this.username = model.username;
  }
}
