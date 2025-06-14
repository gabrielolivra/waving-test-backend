import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UsersEntity } from '../entity/users.entity';
import { CreateUserDto } from '../controllers/dtos/users.dtos';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UsersEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const verifyUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (verifyUser) {
      throw new BadRequestException('Email already exists');
    }

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findOne(email: string) {
    return await this.usersRepository.find({ where: { email } });
  }
}
