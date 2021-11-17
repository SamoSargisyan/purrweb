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
import { ColumnGuard } from 'src/column/column.guard';
import { UserGuard } from 'src/user/user.guards';
import { Card } from './card.entity';
import { CardsService } from './card.service';
import { CreateCardDTO } from './dto/create.card.dto';

@Controller('users/:user_id/columns/:column_id/cards')
export class CardController {
  constructor(private cardsService: CardsService) {}

  @UseGuards(UserGuard, ColumnGuard)
  @Post()
  async create(
    @Body() card: CreateCardDTO,
    @Param('column_id') column_id: string,
  ): Promise<CreateCardDTO> {
    return this.cardsService.create(card, column_id);
  }

  @Get()
  async findAllCardsInColumn(
    @Param('column_id') column_id: string,
  ): Promise<Card[]> {
    return this.cardsService.findAll(column_id);
  }

  // ДОБАВИТЬ ПРОВЕРКУ ВХОДИТ ЛИ КАРТА В ДАННУЮ КОЛОНКУ
  @Get(':card_id')
  async findOneCardInColumn(@Param('card_id') card_id: string) {
    return this.cardsService.findById(card_id);
  }

  @Delete(':card_id')
  async delete(@Param('card_id') card_id: string): Promise<boolean> {
    return this.cardsService.delete(card_id);
  }

  @Put(':card_id')
  async update(
    @Param('card_id') card_id: string,
    @Body() card: CreateCardDTO,
  ): Promise<CreateCardDTO> {
    return this.cardsService.update(card_id, card);
  }
}
