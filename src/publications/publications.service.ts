import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { Publications } from './entities/publications.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publications)
    private readonly publicationsRepository: Repository<Publications>,
    private readonly usersService: UsersService,
    private readonly profilesService: ProfilesService,
  ) {}

  async findAll(): Promise<Publications[]> {
    return this.publicationsRepository.find();
  }

  /**
   * It creates a publication and saves it to the database
   * @param {string} userId - The id of the user who is creating the publication.
   * @param {CreatePublicationDto} createPublication - CreatePublicationDto
   * @returns The publication that was created.
   */
  async createPublication(
    userId: string,
    createPublication: CreatePublicationDto,
  ) {
    const userFound = await this.usersService.getProfileByUserId(userId);

    const profilePublication = await this.profilesService.getProfileByProfileId(
      userFound.profile.id,
    );
    const publication = this.publicationsRepository.create({
      ...createPublication,
    });
    publication.author = profilePublication;
    return this.publicationsRepository.save(publication);
  }
}
