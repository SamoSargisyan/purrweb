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
import { AuthUserDTO } from '../auth/dto/auth.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserGuard } from './user.guards';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ReturnUserDTO } from './dto/return.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('signup')
  async register(@Body() user: CreateUserDTO): Promise<AuthUserDTO> {
    return this.usersService.create(user);
  }

  @Post('login')
  async login(@Body() user: CreateUserDTO): Promise<AuthUserDTO> {
    return this.usersService.login(user);
  }

  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll({
      relations: ['columns', 'columns.cards', 'comments'],
    });
  }

  @Get(':user_id')
  async findUserById(@Param('user_id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @UseGuards(UserGuard)
  @Delete(':user_id')
  async deleteUser(@Param('user_id') id: string): Promise<boolean> {
    return await this.usersService.delete(id);
  }

  @UseGuards(UserGuard)
  @Put(':user_id')
  async updateUser(
    @Param('user_id') id: string,
    @Body() user: CreateUserDTO,
  ): Promise<ReturnUserDTO> {
    return await this.usersService.update(id, user);
  }
}
