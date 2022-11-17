import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { v4 } from 'uuid';
import { ActivateUserDto } from './dto/activate-user.dto';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly usersRepo: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registerUser(regUser: RegisterUserDto): Promise<void> {
    const { email, password } = regUser;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
      activationToken: v4(),
    });
    const foundUser = await this.usersRepository.findOne({
      where: { email },
    });
    if (foundUser) {
      throw new HttpException('', HttpStatus.CONFLICT);
    }
    try {
      await this.usersRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('', HttpStatus.BAD_REQUEST);
      }
      throw new InternalServerErrorException();
    }
  }

  async loginUser(loginDto: LoginUserDto): Promise<{ accessToken: string }> {
    const { email, password } = loginDto;
    const user = await this.usersRepo.findByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (user && (await isValidPassword)) {
      const payload: JwtPayload = { id: user.id, email, active: user.active };


      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    }
    throw new HttpException('Bad credentials', HttpStatus.NOT_ACCEPTABLE);
  }

  async activateUser(activateUserD: ActivateUserDto): Promise<void> {
    const { id, code } = activateUserD;
    const user: User = await this.usersRepository.findOne({
      where: {
        id,
        activationToken: code,
        active: false,
      },
    });
    if (!user) {
      throw new UnprocessableEntityException('This action cannot be performed');
    }
    this.usersRepository.update(id, { active: true });
    user.active = true;
    await this.usersRepository.save(user);
  }
}
