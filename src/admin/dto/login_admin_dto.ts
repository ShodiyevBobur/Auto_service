import { IsNotEmpty, IsString } from 'class-validator';
export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
