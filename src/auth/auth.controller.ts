import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ActivateUserDto } from './dto/activate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<void> {
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
  @Get('get')
  async test(): Promise<string> {
    return 'test';
  }
}
