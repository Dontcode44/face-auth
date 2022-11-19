import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Like, Repository } from 'typeorm';
import { Messenger } from './entities/messenger.entity';

@Injectable()
export class MessengerService {
  constructor(
    @InjectRepository(Messenger)
    private readonly messengerRepository: Repository<Messenger>,
    private readonly userService: UsersService,
  ) {}

  /**
   * This function gets all the messages from the user's profile
   * @param {string} userId - string - The userId of the user you want to get the messages of.
   * @returns The user's messenger object.
   */
  async getAllMessenger(userId: string): Promise<Messenger> {
    const user = await this.userService.getMessengerByUserId(userId);

    const accountMessages = user.profile.messenger;
    if (!accountMessages) {
      throw new Error('No messages');
    }
    return accountMessages;
  }

  /**
   * It takes a chat name as a parameter, finds the chat in the database, and returns the chat if it
   * exists
   * @param {string} chat - string - The chat name that we want to find.
   * @returns The chat found
   */
  async filterByName(userId: string, word: string): Promise<User> {
    const chatFound = await this.userService.getMessengerByFilter(userId, word);
    return chatFound;
  }

  /**
   * It deletes a chat by userId
   * @param {string} userId - string - The userId of the user you want to delete the chat of.
   * @returns The chat is being deleted.
   */
  async deleteChat(userId: string): Promise<Messenger> {
    const chatFound = await this.userService.getMessengerByUserId(userId);
    if (!chatFound) {
      throw new Error('Chat not found');
    }
    return this.messengerRepository.remove(chatFound.profile.messenger);
  }
}
