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
        host: 'face_auth_docker',
        port: 5432,
        username: 'postgres_face',
        password: 'facebook',
        database: 'postgres_face',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsTableName: 'migrations_typeorm',
        migrationsRun: true,
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
