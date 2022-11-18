import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publications } from './entities/publications.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Publications])],
  controllers: [PublicationsController],
  providers: [PublicationsService],
})
export class PublicationsModule {}
