import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CardGuard } from 'src/card/card.guard';
import { ColumnGuard } from 'src/column/column.guard';
// import { CheckJwtGuard } from 'src/user/check-jwt.guatd';
// import { User } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { CardCommentGuard } from './comment.guard';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';
import { CreateCommentsDTO } from './dto/create.comment.dto';

@UseGuards(CardGuard)
@Controller('columns/:column_id/cards/:card_id/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  async findAll(@Param('card_id') card_id: string): Promise<Comment[]> {
    return this.commentService.findAll(card_id);
  }

  @Get(':comment_id')
  async findOne(@Param('comment_id') comment_id: string): Promise<Comment> {
    return this.commentService.findById(comment_id, { relations: ['author'] });
  }

  @UseGuards(ColumnGuard, CardCommentGuard)
  @Post()
  async create(
    @Body() comment: CreateCommentsDTO,
    @Param('card_id') card_id: string,
    @User() user: User,
  ): Promise<CreateCommentsDTO> {
    return this.commentService.create(user, card_id, comment);
  }

  @UseGuards(ColumnGuard, CardCommentGuard)
  @Put(':comment_id')
  async update(
    @Body() commentDto: CreateCommentsDTO,
    @Param('comment_id') comment_id: string,
  ): Promise<CreateCommentsDTO> {
    return this.commentService.update(comment_id, commentDto);
  }

  @UseGuards(ColumnGuard, CardCommentGuard)
  @Delete(':comment_id')
  async delete(@Param('comment_id') comment_id: string): Promise<boolean> {
    return this.commentService.delete(comment_id);
  }
}
