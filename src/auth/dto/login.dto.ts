import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  numero_de_documento: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
