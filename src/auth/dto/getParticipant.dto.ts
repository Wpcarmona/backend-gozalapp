import { IsNotEmpty, IsString } from 'class-validator';

export class GetParticipantDto {
  @IsNotEmpty()
  @IsString()
  campaign: string;

  @IsNotEmpty()
  @IsString()
  distinct_id: string;
}
