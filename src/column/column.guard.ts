import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ColumnService } from './column.service';

@Injectable()
export class ColumnGuard implements CanActivate {
  constructor(private columnService: ColumnService) {}

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    try {
      const column = await this.columnService.findById(req.params.column_id, {
        relations: ['user'],
      });
      const user_id: string = req.params.user_id || req.user.id;

      if (column.user.id !== Number(user_id)) {
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
