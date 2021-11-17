import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnService } from 'src/column/column.service';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CreateCardDTO } from './dto/create.card.dto';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private cardRepository: Repository<Card>,
    private columnService: ColumnService,
  ) {}

  async create(
    cardDto: CreateCardDTO,
    column_id: string,
  ): Promise<CreateCardDTO> {
    const column = await this.columnService.findById(column_id);
    const card = await this.cardRepository.create({ ...cardDto, column });
    await this.cardRepository.save(card);
    return card;
  }

  async findAll(column_id: string): Promise<Card[]> {
    return await this.cardRepository.find({
      where: {
        column: {
          id: column_id,
        },
      },
    });
  }

  async findById(card_id: string, options = {}): Promise<Card> {
    return await this.cardRepository.findOne(card_id, options);
  }

  async update(
    card_id: string,
    cardDto: CreateCardDTO,
  ): Promise<CreateCardDTO> {
    await this.cardRepository.update(card_id, cardDto);
    return cardDto;
  }

  async delete(card_id: string): Promise<boolean> {
    await this.cardRepository.delete(card_id);
    return true;
  }
}
