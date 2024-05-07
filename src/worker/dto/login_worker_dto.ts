import { IsNotEmpty, IsString } from 'class-validator';
export class LoginWorkerDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
