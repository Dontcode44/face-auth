import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profiles } from './entities/profiles.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profiles)
    private readonly profileRepository: Repository<Profiles>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * We're creating a new profile and saving it to the database. Then we're assigning the newly created
   * profile to the user and saving the user
   * @param {string} userId - The id of the user we want to create a profile for.
   * @param {CreateProfileDto} createProfile - CreateProfileDto
   * @returns The user with the profile
   */
  async createProfile(
    userId: string,
    createProfile: CreateProfileDto,
  ): Promise<User> {
    const userFound = await this.userRepository.findOne({
      select: ['profile'],
      where: {
        id: userId,
      },
      relations: ['profile'],
    });
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (userFound.profile) {
      throw new HttpException('Profile already exists', HttpStatus.BAD_REQUEST);
    }

    const profile = this.profileRepository.create(createProfile);
    const savedProfile = await this.profileRepository.save(profile);

    userFound.profile = savedProfile;
    return await this.userRepository.save(userFound);
  }
}
