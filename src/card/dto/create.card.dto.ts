import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCardDTO {
  @ApiProperty({
    description: 'Card',
    example: 'New card',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  @Length(4, 32, { message: 'Must be from 4 to 32' })
  readonly title: string;

  @ApiProperty({
    description: "Card's description",
    example: 'Some things',
    type: String,
  })
  readonly description?: string;
}
