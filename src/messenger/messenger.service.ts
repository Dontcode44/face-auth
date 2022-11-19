import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Messenger } from './entities/messenger.entity';

@Injectable()
export class MessengerService {
  constructor(
    @InjectRepository(Messenger)
    private messengerRepository: Repository<Messenger>,
  ) {}

  /**
   * It returns a promise of an array of Messenger objects
   * @param {string} userId - string
   * @returns An array of all the messengers in the database.
   */
  async getAllMessenger(userId: string): Promise<Messenger[]> {
    return this.messengerRepository.find();
  }

  /**
   * It takes a chat name as a parameter, finds the chat in the database, and returns the chat if it
   * exists
   * @param {string} chat - string - The chat name that we want to find.
   * @returns The chat found
   */
  async filterByName(chat: string): Promise<Messenger> {
    const chatFound = await this.messengerRepository.findOne({
      where: {
        chats: chat,
      },
    });
    if (!chat) {
      throw new Error('Chat not found');
    }
    return chatFound;
  }

  /**
   * It deletes a chat
   * @param {string} chat - string - The chat ID of the chat you want to delete.
   * @returns The chat is being deleted from the database.
   */
  deleteChat(chat: string) {
    return this.messengerRepository.delete(chat);
  }
}