import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const foundEmail = this.usersRepo.findOne({ where: { email } });
    if (!foundEmail) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return foundEmail;
  }

  async findById(id: string): Promise<User> {
    const foundId = this.usersRepo.findOne({ where: { id } });
    if (!foundId) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return foundId;
  }

  async finAll(userId: string): Promise<User[]> {
    const foundAll = this.usersRepo.find({
      where: {
        id: userId,
      },
    });
    if (!foundAll) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return foundAll;
  }
}
