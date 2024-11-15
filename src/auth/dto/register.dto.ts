import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'El correo electrónico no es válido.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacía.' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacío.' })
  nombre_completo: string;

  @IsString()
  @Matches(/^\d+$/, {
    message: 'El número de celular debe contener solo números.',
  })
  @Length(7, 15, {
    message: 'El número de celular debe tener entre 7 y 15 caracteres.',
  })
  numero_de_celular: string;

  @IsString()
  @IsNotEmpty({ message: 'El tipo de documento no puede estar vacío.' })
  tipo_de_documento: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: 'El número de documento debe ser alfanumérico.',
  })
  numero_de_documento: string;
}
