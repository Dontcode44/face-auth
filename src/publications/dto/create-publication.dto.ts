import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
