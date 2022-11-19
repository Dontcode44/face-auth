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

  async getAllMessenger(
    userId: string,
  ): Promise<Messenger[]> {
    return this.messengerRepository.find();
  }
}