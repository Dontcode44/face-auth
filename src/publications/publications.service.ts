import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfilesService } from 'src/profiles/profiles.service';
import { UsersService } from 'src/users/users.service';
import { LessThanOrEqual, Like, MoreThan, Repository } from 'typeorm';
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

  /**
   * It returns a promise of an array of Publications
   * @returns An array of Publications
   */
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

  /**
   * It searches for a publication by title and returns the publication if found
   * @param {string} title - string
   * @returns An array of publications that match the title.
   */
  async searchTitle(title: string) {
    const postFound = await this.publicationsRepository.findBy({
      title: Like('%' + title + '%'),
    });
    if (!postFound) {
      throw new Error('Publication not found');
    }
    return postFound;
  }

  /**
   * It searches for publications with more than 10 likes
   * @param {number} likes - number
   * @returns An array of publications with more than 10 likes.
   */
  searchMoreLikes(likes: number) {
    const likesFound = this.publicationsRepository.find({
      where: {
        likes: MoreThan(10),
      },
    });
    if (!likesFound) {
      throw new Error('Publication not found');
    }
    return likesFound;
  }

  /**
   * It searches for publications with less than or equal to 10 likes
   * @param {number} likes - number
   * @returns An array of publications
   */
  searchLikes(likes: number) {
    const likesFound = this.publicationsRepository.find({
      where: {
        likes: LessThanOrEqual(10),
      },
    });
    if (!likesFound) {
      throw new Error('Publication not found');
    }
    return likesFound;
  }
}
