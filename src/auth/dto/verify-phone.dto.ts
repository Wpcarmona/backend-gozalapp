import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyPhoneDto {
  @IsNotEmpty({ message: 'El campo distinct_id es obligatorio' })
  @IsString({ message: 'El campo distinct_id debe ser un string' })
  distinct_id: string;

  @IsNotEmpty({ message: 'El campo code es obligatorio' })
  @IsString({ message: 'El campo code debe ser un string' })
  code: string;
}
