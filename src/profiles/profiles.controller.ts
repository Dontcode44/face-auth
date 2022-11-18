import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  //@UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createProfile(
    @Userd() user: User,
    @Body() createProfile: CreateProfileDto,
  ): Promise<User> {
    return await this.profilesService.createProfile(user.id, createProfile);
  }
}
