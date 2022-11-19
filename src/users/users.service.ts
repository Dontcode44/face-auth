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

  /**
   * It finds a user by email and if it doesn't exist, it throws an error
   * @param {string} email - string - the email of the user we want to find
   * @returns The user object
   */
  async findByEmail(email: string): Promise<User> {
    const foundEmail = this.usersRepo.findOne({ where: { email } });
    if (!foundEmail) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return foundEmail;
  }

  /**
   * It finds a user by id and if it doesn't exist, it throws an error
   * @param {string} id - string - The id of the user we want to find.
   * @returns The user with the id that was passed in.
   */
  async findById(id: string): Promise<User> {
    const foundId = this.usersRepo.findOne({ where: { id } });
    if (!foundId) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return foundId;
  }

  /**
   * It finds all users with the given userId
   * @param {string} userId - string - The userId is the id of the user that we want to find.
   * @returns An array of users
   */
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

  /**
   * It returns a user's profile by their userId
   * @param {string} userId - string - the userId of the user we want to find
   */
  async getProfileByUserId(userId: string) {
    const profileFound = await this.usersRepo.findOne({
      select: ['profile'],
      where: {
        id: userId,
      },
      relations: ['profile'],
    });
    if (!profileFound) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return profileFound;
  }

  /**
   * It finds a user by userId, and returns the user's messenger
   * @param {string} userId - string - the userId of the user whose messenger we want to get
   * @returns The messenger of the user with the given userId.
   */
  async getMessengerByUserId(userId: string) {
    const messengerFound = await this.usersRepo.findOne({
      select: ['profile'],
      where: {
        profile: {
          messenger: {
            chats: 'chat',
          },
        },
      },
    });
    if (!messengerFound) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return messengerFound;
  }

  /**
   * It finds a user by a given userId, and then finds a chat by a given word
   * @param {string} userId - string - the user id of the user whose messenger you want to get
   * @param {string} word - string - the word that we want to search for
   */
  async getMessengerByFilter(userId: string, word: string) {
    const messengerFound = await this.usersRepo.findOne({
      select: ['profile'],
      where: {
        profile: {
          messenger: {
            chats: 'chat',
          },
        },
      },
    });
    if (!messengerFound) {
      throw new HttpException('Not exist', HttpStatus.NOT_FOUND);
    }
    return messengerFound;
  }
}
