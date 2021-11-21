import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ColumnGuard } from 'src/column/column.guard';
import { UserGuard } from 'src/user/user.guards';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CreateCardDTO } from './dto/create.card.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateColumnDTO } from '../column/dto/create.column.dto';

@ApiTags('Card')
@Controller('users/:user_id/columns/:column_id/cards')
export class CardController {
  constructor(private cardsService: CardService) {}

  @UseGuards(UserGuard, ColumnGuard)
  @ApiOperation({ summary: 'Create card' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateCardDTO })
  @Post('add')
  async create(
    @Body() card: CreateCardDTO,
    @Param('column_id') column_id: string,
  ): Promise<CreateCardDTO> {
    return this.cardsService.create(card, column_id);
  }

  @ApiOperation({ summary: 'Find All' })
  @ApiResponse({ status: HttpStatus.OK, type: [Card] })
  @Get('all')
  async findAllCardsInColumn(
    @Param('column_id') column_id: string,
  ): Promise<Card[]> {
    return this.cardsService.findAll(column_id);
  }

  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({ status: HttpStatus.OK, type: Card })
  @Get(':card_id')
  async findOneCardInColumn(@Param('card_id') card_id: string): Promise<Card> {
    return this.cardsService.findById(card_id);
  }

  @ApiOperation({ summary: 'Delete card' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':card_id')
  async delete(@Param('card_id') card_id: string): Promise<boolean> {
    return this.cardsService.delete(card_id);
  }

  @ApiOperation({ summary: 'Update card' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateCardDTO })
  @Put(':card_id')
  async update(
    @Param('card_id') card_id: string,
    @Body() card: CreateCardDTO,
  ): Promise<CreateCardDTO> {
    return this.cardsService.update(card_id, card);
  }
}
