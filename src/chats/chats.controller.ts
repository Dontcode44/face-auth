import { Controller, Post, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { ChatsService } from './chats.service';
import { Chats } from './entities/chats.entity';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  createChat(
    @Userd('id') userId: string,
    @Userd('id') userId2: string,
  ): Promise<Chats[]> {
    return this.chatsService.createChat(userId, userId2);
  }
}
