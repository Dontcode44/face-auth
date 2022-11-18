import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { User } from 'src/users/entities/user.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { PublicationsService } from './publications.service';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createPublication(
    @Userd() user: User,
    @Body() createPublication: CreatePublicationDto,
  ) {
    return await this.publicationsService.createPublication(
      user.id,
      createPublication,
    );
  }
}
