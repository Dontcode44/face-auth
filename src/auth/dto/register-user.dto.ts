import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: 'Please enter a valid email' })
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;
}