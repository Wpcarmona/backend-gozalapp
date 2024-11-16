import {
  Controller,
  Post,
  Headers,
  HttpCode,
  HttpStatus,
  Body,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './interfaces/login-response.interfacee';
import { LogoutResponse } from './interfaces/logout-response.interface';
import { RegisterResponse } from './interfaces/register-response.interface';
import { RegisterDto } from './dto/register.dto';
import { UpdateParticipantDto } from './dto/updateParticipant.dto';
import { UpdateParticipantResponse } from './interfaces/updateParticipant.interface';
import { GetParticipantDto } from './dto/getParticipant.dto';
import { GetParticipantResponse } from './interfaces/getParticipant-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Headers('authorization') authorization: string,
  ): Promise<LogoutResponse> {
    const token = authorization?.split(' ')[1];
    if (!token) {
      throw new HttpException('Token no proporcionado', HttpStatus.BAD_REQUEST);
    }

    return this.authService.logout({ token });
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<RegisterResponse> {
    return this.authService.register(registerDto);
  }

  @Post('update')
  async updateParticipant(
    @Body() updateParticipantDto: UpdateParticipantDto,
  ): Promise<UpdateParticipantResponse> {
    if (
      !updateParticipantDto.properties ||
      Object.keys(updateParticipantDto.properties).length === 0
    ) {
      throw new HttpException(
        'El campo properties no puede estar vacío',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.authService.updateParticipant(updateParticipantDto);
  }

  @Post('info')
  async getParticipant(
    @Body() body: GetParticipantDto,
  ): Promise<GetParticipantResponse> {
    return await this.authService.getParticipant(body);
  }

  @Post('login-info')
  async loginInfo(@Body() loginDto: LoginDto): Promise<any> {
    return this.authService.loginInfo(loginDto);
  }
}
