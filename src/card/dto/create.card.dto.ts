import { IsString, Length } from 'class-validator';

export class CreateCardDTO {
  @IsString({ message: 'Must be string' })
  @Length(4, 32, { message: 'Must be from 4 to 32' })
  readonly title: string;

  readonly description?: string;
}
