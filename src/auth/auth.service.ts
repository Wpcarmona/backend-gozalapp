// src/auth/auth.service.ts
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interfacee';
import { LogoutDto } from './dto/logout.dto';
import { LogoutResponse } from './interfaces/logout-response.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly campaign: string;

  constructor(private configService: ConfigService) {
    this.apiUrl = this.configService.get<string>('API_URL');
    this.apiKey = this.configService.get<string>('API_KEY');
    this.campaign = this.configService.get<string>('CAMPAIGN');
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        `${this.apiUrl}/sessions/login`,
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
        `${this.apiUrl}/sessions/logout`,
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
}
