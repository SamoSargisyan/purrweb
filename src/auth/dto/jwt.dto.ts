import { IsJWT } from 'class-validator';

export class JwtDTO {
  @IsJWT()
  readonly accessToken: string;
}
