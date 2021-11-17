import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CardColumn } from './column.entity';
import { CreateColumnDTO } from './dto/create.column.dto';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(CardColumn)
    private columnsRepository: Repository<CardColumn>,
    private userService: UserService,
  ) {}

  async findById(column_id: string, options = {}): Promise<CardColumn> {
    return await this.columnsRepository.findOne(column_id, options);
  }

  async findUsersColumns(user_id: string): Promise<CardColumn[]> {
    return await this.columnsRepository.find({
      where: {
        user: {
          id: user_id,
        },
      },
    });
  }

  async create(
    columnDto: CreateColumnDTO,
    user_id: string,
  ): Promise<CreateColumnDTO> {
    const user = await this.userService.findById(user_id);
    const column = await this.columnsRepository.create({ ...columnDto, user });
    await this.columnsRepository.save(column);
    return column;
  }

  async update(
    new_column: CreateColumnDTO,
    column_id: string,
  ): Promise<CreateColumnDTO> {
    await this.columnsRepository.update(column_id, new_column);
    return new_column;
  }

  async delete(column_id: string): Promise<boolean> {
    await this.columnsRepository.delete(column_id);
    return true;
  }
}
