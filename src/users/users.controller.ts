import { Controller, Get, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get('test')
  async getAll(@Userd() user: User) {
    return this.usersService.finAll(user.id);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get('age')
  async getAge(@Userd() user: User) {
    return this.usersService.getAgeUser(user.id);
  }
}
