import { IsAlpha, IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProfileDto {
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
