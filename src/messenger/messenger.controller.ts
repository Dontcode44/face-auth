import { Controller, Delete, Get, Query, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { User } from 'src/users/entities/user.entity';
import { Messenger } from './entities/messenger.entity';
import { MessengerService } from './messenger.service';

@Controller('messenger')
export class MessengerController {
  constructor(private readonly messengerService: MessengerService) {}

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllMessenger(@Userd() userId: string): Promise<Messenger> {
    return this.messengerService.getAllMessenger(userId);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteChat(@Userd() userId: string): Promise<Messenger> {
    return this.messengerService.deleteChat(userId);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get('filter')
  async filterByName(
    @Userd() userId: string,
    @Query() word: string,
  ): Promise<User> {
    return this.messengerService.filterByName(userId, word);
  }
}
