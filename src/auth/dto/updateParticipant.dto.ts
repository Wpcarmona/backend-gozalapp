import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class UpdateParticipantDto {
  @IsNotEmpty()
  @IsString()
  api_key: string;

  @IsNotEmpty()
  @IsString()
  campaign: string;

  @IsNotEmpty()
  @IsString()
  distinct_id: string;

  @IsNotEmpty()
  @IsObject()
  properties: {
    genero?: string;
    email?: string;
    numero_de_documento?: string;
    [key: string]: any;
  };
}
