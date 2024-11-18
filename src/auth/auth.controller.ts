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
import { SendVerifyPhoneResponse } from './interfaces/send-verify-phone-response.interface';
import { SendVerifyPhoneDto } from './dto/send-verify-phone.dto';
import { VerifyPhoneDto } from './dto/verify-phone.dto';
import { VerifyPhoneResponse } from './interfaces/verify-phone-response.interface';
import { SendVerifyEmailDto } from './dto/send-verify-email.dto';
import { SendVerifyEmailResponse } from './interfaces/send-verify-email-response.interface';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { VerifyEmailResponse } from './interfaces/verify-email-response.interface';

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

  @Post('register-and-login')
  async registerAndLogin(
    @Body() registerDto: RegisterDto,
  ): Promise<LoginResponse> {
    return this.authService.registerAndLogin(registerDto);
  }

  @Post('send-verify-phone')
  async sendVerifyPhone(
    @Body() sendVerifyPhoneDto: SendVerifyPhoneDto,
  ): Promise<SendVerifyPhoneResponse> {
    return this.authService.sendVerifyPhone(sendVerifyPhoneDto);
  }

  @Post('verify-phone')
  async verifyPhone(
    @Body() verifyPhoneDto: VerifyPhoneDto,
  ): Promise<VerifyPhoneResponse> {
    return this.authService.verifyPhone(verifyPhoneDto);
  }

  @Post('send-verify-email')
  async sendVerifyEmail(
    @Body() sendVerifyEmailDto: SendVerifyEmailDto,
  ): Promise<SendVerifyEmailResponse> {
    return this.authService.sendVerifyEmail(sendVerifyEmailDto);
  }

  @Post('verify-email')
  async verifyEmail(
    @Body() verifyEmailDto: VerifyEmailDto,
  ): Promise<VerifyEmailResponse> {
    return this.authService.verifyEmail(verifyEmailDto);
  }
}
