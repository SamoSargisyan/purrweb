import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardService } from 'src/card/card.service';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentsDTO } from './dto/create.comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private cardService: CardService,
  ) {}

  async findAll(card_id: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: {
        card: {
          id: card_id,
        },
      },
    });
  }

  async findById(comment_id: string, options = {}): Promise<Comment> {
    return await this.commentRepository.findOne(comment_id, options);
  }

  async create(
    author: User,
    cardId: string,
    commentDTO: CreateCommentsDTO,
  ): Promise<CreateCommentsDTO> {
    const card = await this.cardService.findById(cardId);
    const comment = await this.commentRepository.create({
      ...commentDTO,
      card,
      author,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async update(
    commentId: string,
    commentDTO: CreateCommentsDTO,
  ): Promise<CreateCommentsDTO> {
    await this.commentRepository.update(commentId, commentDTO);
    return commentDTO;
  }

  async delete(commentId: string): Promise<boolean> {
    await this.commentRepository.delete(commentId);
    return true;
  }
}
