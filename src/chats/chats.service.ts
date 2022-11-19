import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chats } from './entities/chats.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats)
    private readonly chatsRepository: Repository<Chats>,
  ) {}

  /**
   * This function creates a chat between two users
   * @param {string} userId - The userId of the user who is sending the message.
   * @param {string} userId2 - string - The userId of the person you want to chat with
   * @returns The createChat function is returning the createChat variable.
   */
  async createChat(userId: string, userId2: string): Promise<Chats[]> {
    const createChat = this.chatsRepository.find({
      where: {
        users: userId,
        messages: userId2,
      },
    });
    const createConversation = this.chatsRepository.create({
      users: [userId, userId2],
    });
    await this.chatsRepository.save(createConversation);
    return createChat;
  }
}