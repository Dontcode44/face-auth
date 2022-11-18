import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from './entities/profiles.entity';
import { User } from 'src/users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Profiles, User]), JwtModule],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  exports: [ProfilesModule],
})
export class ProfilesModule {}
