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
import { UserGuard } from 'src/user/user.guards';
import { CardColumn } from './column.entity';
import { ColumnService } from './column.service';
import { CreateColumnDTO } from './dto/create.column.dto';
import { ColumnGuard } from './column.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Column')
@Controller('users/:user_id/columns')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @ApiOperation({ summary: 'Find all' })
  @ApiResponse({ status: HttpStatus.OK, type: [CardColumn] })
  @Get('all')
  async findUsersColumns(
    @Param('user_id') user_id: string,
  ): Promise<CardColumn[]> {
    return this.columnService.findUsersColumns(user_id);
  }

  @UseGuards(ColumnGuard)
  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({ status: HttpStatus.OK, type: [CardColumn] })
  @Get(':column_id')
  async findUserColumnById(
    @Param('column_id') column_id: string,
  ): Promise<CardColumn> {
    return this.columnService.findById(column_id);
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Find one' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateColumnDTO })
  @Post('add')
  async create(
    @Body() column: CreateColumnDTO,
    @Param('user_id') user_id: string,
  ): Promise<CreateColumnDTO> {
    return this.columnService.create(column, user_id);
  }

  @UseGuards(UserGuard, ColumnGuard)
  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CreateColumnDTO })
  @Put(':column_id')
  async update(
    @Param('column_id') column_id: string,
    @Body() column: CreateColumnDTO,
  ): Promise<CreateColumnDTO> {
    return this.columnService.update(column, column_id);
  }

  @UseGuards(UserGuard, ColumnGuard)
  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':column_id')
  async delete(@Param('column_id') column_id: string): Promise<boolean> {
    return this.columnService.delete(column_id);
  }
}
