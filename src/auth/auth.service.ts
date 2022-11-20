import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { User } from 'src/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { jwtConstants } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string): Promise<User | null> {
    const user = await this.usersService.findOne(username)

    if (!user) { return null }

    return user
  }

  async registrationUser(createUserDto: CreateUserDto, res: Response): Promise<Response> {
    await this.usersService.registration(createUserDto)
    return res.send(`user created`)
  }

  async loginUser(loginUserDto: LoginUserDto, res: Response): Promise<Response> {
    const user = await this.usersService.login(loginUserDto)

    const access = await this.generateAccessToken(user)
    const refresh = await this.generateRefreshAccessToken(user._id as string)

    return res.send({...access, ...refresh, username: user.username })
  }

  async generateAccessToken(user: User) {
    return {
      access_token: this.jwtService.sign({ user })
    }
  }

  async generateRefreshAccessToken(userId: string) {
    return {
      refresh_token: this.jwtService.sign(
        { userId },
        {
          secret: jwtConstants.secret,
          expiresIn: '30d'
        },
      )
    }
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token)
    } catch(error) {
      return {error: error.message}
    }
  }

  parseJwt (token) {
    const parsed = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    return parsed.user
  }

  async getUserByTokenData(token: string): Promise<User> {
    const parsedTokenData = this.parseJwt(token)
    return await this.usersService.findOne(parsedTokenData.username)
  }

}
