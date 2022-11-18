import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publications } from './entities/publications.entity';
import { UsersModule } from 'src/users/users.module';
import { ProfilesModule } from 'src/profiles/profiles.module';

@Module({
  imports: [TypeOrmModule.forFeature([Publications]), UsersModule, ProfilesModule],
  controllers: [PublicationsController],
  providers: [PublicationsService],
  exports: [PublicationsService],
})
export class PublicationsModule {}
