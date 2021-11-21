import { IsJWT } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JwtDTO {
  @ApiProperty({
    description: 'Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: String,
  })
  @IsJWT()
  readonly accessToken: string;
}
