import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  login: string; // Can be either username or email

  @IsString()
  password: string;
}
