import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentService } from './comment.service';

@Injectable()
export class CardCommentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    try {
      const comment = await this.commentService.findById(
        req.params.comment_id,
        { relations: ['card'] },
      );

      if (comment.card.id !== Number(req.params.card_id)) {
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
