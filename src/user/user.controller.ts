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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthUserDTO } from '../auth/dto/auth.user.dto';
import { CreateUserDTO } from './dto/create.user.dto';
import { UserGuard } from './user.guards';
import { User } from './user.entity';
import { UserService } from './user.service';
import { ReturnUserDTO } from './dto/return.user.dto';

@ApiBearerAuth()
@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: HttpStatus.CREATED, type: AuthUserDTO })
  @Post('signup')
  async register(@Body() user: CreateUserDTO): Promise<AuthUserDTO> {
    return this.usersService.create(user);
  }

  @ApiOperation({ summary: 'Log-in User' })
  @ApiResponse({ status: HttpStatus.OK, type: AuthUserDTO })
  @Post('login')
  async login(@Body() user: CreateUserDTO): Promise<AuthUserDTO> {
    return this.usersService.login(user);
  }

  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get('all')
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll({
      relations: ['columns', 'columns.cards', 'comments'],
    });
  }

  @ApiOperation({ summary: 'Find user' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':user_id')
  async findUserById(@Param('user_id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @Delete(':user_id')
  async deleteUser(@Param('user_id') id: string): Promise<boolean> {
    return await this.usersService.delete(id);
  }

  @UseGuards(UserGuard)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: HttpStatus.OK, type: ReturnUserDTO })
  @Put(':user_id')
  async updateUser(
    @Param('user_id') id: string,
    @Body() user: CreateUserDTO,
  ): Promise<ReturnUserDTO> {
    return await this.usersService.update(id, user);
  }
}
