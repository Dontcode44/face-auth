import { IsAlpha, IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  lastname: string;

  @IsNotEmpty()
  birthdate: Date;
}
