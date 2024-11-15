import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { RegisterDto } from './dto/register.dto';
import { RegisterResponse } from './interfaces/register-response.interface';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interfacee';
import { LogoutDto } from './dto/logout.dto';
import { LogoutResponse } from './interfaces/logout-response.interface';
import { UpdateParticipantDto } from './dto/updateParticipant.dto';
import { UpdateParticipantResponse } from './interfaces/updateParticipant.interface';
import { GetParticipantResponse } from './interfaces/getParticipant-response.interface';
import { GetParticipantDto } from './dto/getParticipant.dto';

@Injectable()
export class AuthService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly campaign: string;

  constructor(private readonly configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.apiKey = this.configService.get<string>('API_KEY');
    this.campaign = this.configService.get<string>('CAMPAIGN');
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.apiUrl}/microsite/sessions/login`,
        {
          api_key: this.apiKey,
          campaign: this.campaign,
          participation: {
            numero_de_documento: loginDto.numero_de_documento,
            password: loginDto.password,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data,
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Unexpected error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async logout(logoutDto: LogoutDto): Promise<LogoutResponse> {
    try {
      const response = await axios.post<LogoutResponse>(
        `${this.apiUrl}/microsite/sessions/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${logoutDto.token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new HttpException(
          error.response.data.message,
          error.response.data.code_error === 295
            ? HttpStatus.UNAUTHORIZED
            : HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Error desconocido',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponse> {
    const payload = {
      api_key: this.apiKey,
      campaign: this.campaign,
      properties: {
        ...registerDto,
      },
    };

    try {
      const response = await axios.post<RegisterResponse>(
        `${this.apiUrl}/participants`,
        payload,
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data,
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Ocurrió un error al realizar la solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateParticipant(
    data: UpdateParticipantDto,
  ): Promise<UpdateParticipantResponse> {
    try {
      const response = await axios.post<UpdateParticipantResponse>(
        `${this.apiUrl}/participants/update`,
        {
          api_key: this.apiKey,
          campaign: this.campaign,
          ...data,
        },
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message || 'Error en la solicitud',
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Error inesperado al realizar la solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getParticipant(
    dto: GetParticipantDto,
  ): Promise<GetParticipantResponse> {
    try {
      const response = await axios.get<GetParticipantResponse>(
        `${this.apiUrl}/participants/info`,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
          params: {
            campaign: dto.campaign,
            distinct_id: dto.distinct_id,
          },
        },
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        throw new HttpException(
          error.response.data.message || 'Error en la solicitud',
          error.response.status || HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Error inesperado al realizar la solicitud',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
