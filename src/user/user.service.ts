import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create.user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { AuthService } from '../auth/auth.service';
import { AuthUserDTO } from '../auth/dto/auth.user.dto';
import { ReturnUserDTO } from './dto/return.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async findAll(options = {}): Promise<User[]> {
    return await this.userRepository.find(options);
  }

  async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async login(userDTO: CreateUserDTO): Promise<AuthUserDTO> {
    const user = await this.findByEmail(userDTO.email);
    const isPasswordEquals = await bcrypt.compare(
      userDTO.password,
      user.password,
    );
    if (user && isPasswordEquals) {
      return this.authService.generateResponse(user);
    }
    throw new HttpException('User is not logged in', HttpStatus.UNAUTHORIZED);
  }

  async create(userDTO: CreateUserDTO): Promise<AuthUserDTO> {
    const candidate = await this.findByEmail(userDTO.email);
    if (candidate) {
      throw new HttpException(
        'User with the email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash_password = await bcrypt.hash(userDTO.password, 10);
    const user = await this.userRepository.create({
      ...userDTO,
      password: hash_password,
    });
    await this.userRepository.save(user);

    return this.authService.generateResponse(user);
  }

  async delete(id: string): Promise<boolean> {
    await this.userRepository.delete(id);
    return true;
  }

  async update(id: string, userDTO: CreateUserDTO): Promise<ReturnUserDTO> {
    const candidate = await this.findByEmail(userDTO.email);
    if (candidate && candidate.id !== Number(id)) {
      throw new HttpException(
        'User with the email already exists',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const hash_password = await bcrypt.hash(userDTO.password, 10);
    const updatedUser = new CreateUserDTO({
      ...userDTO,
      password: hash_password,
    });
    await this.userRepository.update(id, updatedUser);
    return new ReturnUserDTO(userDTO);
  }
}
