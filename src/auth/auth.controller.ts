import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { RegistrationGuard } from './guards/registration.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LoginGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response): Promise<Response> {
    return this.authService.loginUser(loginUserDto, res)
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  @HttpCode(HttpStatus.CREATED)
  registrationUser(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
    return this.authService.registrationUser(createUserDto, res)
  }

}
