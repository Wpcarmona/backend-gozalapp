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
}
