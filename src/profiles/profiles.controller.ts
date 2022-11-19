import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Userd } from 'src/auth/decorators/token.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MiddleGuard } from 'src/auth/guards/middle.guard';
import { User } from 'src/users/entities/user.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profiles } from './entities/profiles.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  /**
   * It takes a user object and a createProfile object, and returns a user object
   * @param {User} user - User - This is the user object that we get from the decorator.
   * @param {CreateProfileDto} createProfile - CreateProfileDto
   * @returns The user object
   */
  async createProfile(
    @Userd() user: User,
    @Body() createProfile: CreateProfileDto,
  ): Promise<User> {
    return await this.profilesService.createProfile(user.id, createProfile);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  /**
   * It takes a user object and an updateProfile object as arguments, and returns a promise of a
   * Profiles object
   * @param {User} user - User - This is the user object that we get from the decorator.
   * @param {UpdateProfileDto} updateProfile - UpdateProfileDto
   * @returns The updated profile.
   */
  async updateProfile(
    @Userd() user: User,
    @Body() updateProfile: UpdateProfileDto,
  ): Promise<Profiles> {
    return await this.profilesService.updateProfile(user.id, updateProfile);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Patch('delete')
  /**
   * It takes a user object as an argument, and returns a promise that resolves to a user object
   * @param {User} user - User - This is the user object that is returned from the decorator.
   * @returns The user object is being returned.
   */
  async deleteProfile(@Userd() user: User): Promise<User> {
    return await this.profilesService.deleteProfile(user.id);
  }

  @UseGuards(MiddleGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  /**
   * The function is an async function that takes a user object as a parameter and returns a promise of
   * a profile object
   * @param {User} user - User - This is the user object that we are getting from the decorator.
   * @returns The profile of the user that is logged in.
   */
  async getProfile(@Userd() user: User): Promise<Profiles> {
    return await this.profilesService.getProfile(user.id);
  }
}
