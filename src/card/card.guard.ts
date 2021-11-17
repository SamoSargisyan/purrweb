import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { CardService } from './card.service';

@Injectable()
export class CardGuard implements CanActivate {
  constructor(private cardSerivce: CardService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const card = await this.cardSerivce.findById(req.params.card_id, {
        relations: ['column'],
      });

      if (card.column.id !== Number(req.params.column_id)) {
        throw new HttpException(
          'This action is unauthorized',
          HttpStatus.FORBIDDEN,
        );
      }

      return true;
    } catch (error) {
      throw new HttpException(
        'This action is unauthorized',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
