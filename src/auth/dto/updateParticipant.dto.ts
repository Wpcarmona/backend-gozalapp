import {
  IsNotEmpty,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PropertiesDto {
  [key: string]: any;
}

export class UpdateParticipantDto {
  @IsNotEmpty()
  @IsString()
  distinct_id: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => PropertiesDto)
  properties: PropertiesDto;
}
