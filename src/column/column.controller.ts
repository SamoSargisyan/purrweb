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
import { UserGuard } from 'src/user/user.guards';
import { CardColumn } from './column.entity';
import { ColumnService } from './column.service';
import { CreateColumnDTO } from './dto/create.column.dto';
import { ColumnGuard } from './column.guard';

@Controller('users/:user_id/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Get()
  async findUsersColumns(
    @Param('user_id') user_id: string,
  ): Promise<CardColumn[]> {
    return this.columnService.findUsersColumns(user_id);
  }

  @UseGuards(ColumnGuard)
  @Get(':column_id')
  async findUserColumnById(
    @Param('column_id') column_id: string,
  ): Promise<CardColumn> {
    return this.columnService.findById(column_id);
  }

  @UseGuards(UserGuard)
  @Post()
  async create(
    @Body() column: CreateColumnDTO,
    @Param('user_id') user_id: string,
  ): Promise<CreateColumnDTO> {
    return this.columnService.create(column, user_id);
  }

  @UseGuards(UserGuard, ColumnGuard)
  @Put(':column_id')
  async update(
    @Param('column_id') column_id: string,
    @Body() column: CreateColumnDTO,
  ): Promise<CreateColumnDTO> {
    return this.columnService.update(column, column_id);
  }

  @UseGuards(UserGuard, ColumnGuard)
  @Delete(':column_id')
  async delete(@Param('column_id') column_id: string): Promise<boolean> {
    return this.columnService.delete(column_id);
  }
}
