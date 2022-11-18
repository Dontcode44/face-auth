import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profiles } from './entities/profiles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profiles])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
