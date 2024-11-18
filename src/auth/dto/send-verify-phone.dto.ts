import { IsNotEmpty, IsString } from 'class-validator';

export class SendVerifyPhoneDto {
  @IsNotEmpty({ message: 'El campo distinct_id es obligatorio' })
  @IsString({ message: 'El campo distinct_id debe ser un string' })
  distinct_id: string;
}
