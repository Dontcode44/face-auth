import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friends } from './entities/friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends)
    private friendsRepository: Repository<Friends>,
  ) {}

  /**
   * It finds all the friends of a user and returns them
   * @returns An array of friends
   */
  async findAll() {
    const friends = await this.friendsRepository.find({
      relations: ['user', 'friend'],
    });

    if (!friends) {
      throw new Error('Friends not found');
    }
    return friends;
  }
}
