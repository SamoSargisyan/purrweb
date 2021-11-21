import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateColumnDTO {
  @ApiProperty({
    description: 'Column',
    example: 'Column title',
    type: String,
  })
  @IsString({ message: 'Must be string' })
  readonly name: string;
}
