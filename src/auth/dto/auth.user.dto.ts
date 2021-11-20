import { JwtDTO } from './jwt.dto';
import { ReturnUserDTO } from '../../user/dto/return.user.dto';

export class AuthUserDTO extends ReturnUserDTO {
  tokens: JwtDTO;

  constructor(user: ReturnUserDTO, tokens: JwtDTO) {
    super(user);
    this.tokens = tokens;
  }
}
