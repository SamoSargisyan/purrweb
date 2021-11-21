import { JwtDTO } from './jwt.dto';
import { ReturnUserDTO } from '../../user/dto/return.user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class AuthUserDTO extends ReturnUserDTO {
  @ApiProperty({
    description: 'Token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    type: JwtDTO,
  })
  tokens: JwtDTO;

  constructor(user: ReturnUserDTO, tokens: JwtDTO) {
    super(user);
    this.tokens = tokens;
  }
}
