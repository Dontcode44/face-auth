import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { Userd, Userd as Usertoken } from './decorators/token.decorator';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MiddleGuard } from './guards/middle.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerUser: RegisterUserDto,
  ): Promise<{ activationToken: string }> {
    return this.authService.registerUser(registerUser);
  }

  @Post('login')
  async login(
    @Body() loginUser: LoginUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.loginUser(loginUser);
  }

  @Get('activate')
  async activateAccount(@Query() activateUser: ActivateUserDto): Promise<void> {
    return this.authService.activateUser(activateUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tests')
  async test(@Usertoken() token: string): Promise<string> {
    console.log(token);
    return 'c:';
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Post('test')
  async test2(@Userd() user: User): Promise<string> {
    console.log(user.id);
    return 'c:';
  }
}
