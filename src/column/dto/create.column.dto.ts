import { IsString } from 'class-validator';

export class CreateColumnDTO {
  @IsString({ message: 'Must be string' })
  readonly name: string;
}
