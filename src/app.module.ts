import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PublicationsModule } from './publications/publications.module';
import { MessengerModule } from './messenger/messenger.module';
import { ChatsModule } from './chats/chats.module';
import { FriendsModule } from './friends/friends.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5440,
        username: 'postgres_face',
        password: 'facebook',
        database: 'postgres_face',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    AuthModule,
    UsersModule,
    ProfilesModule,
    PublicationsModule,
    MessengerModule,
    ChatsModule,
    FriendsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
