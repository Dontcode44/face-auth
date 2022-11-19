import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messenger } from './entities/messenger.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Messenger]), JwtModule, UsersModule],
  controllers: [MessengerController],
  providers: [MessengerService],
})
export class MessengerModule {}
