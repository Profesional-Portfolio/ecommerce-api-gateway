import { Controller, Post, Body, UseGuards, Get, Request, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RABBIT_SERVICE } from '../config';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.clientProxy.send('login', loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: any) {
    try {
      // return this.clientProxy.send({ cmd: 'auth.register.user'}, registerDto);
      return firstValueFrom(this.clientProxy.send({ cmd: 'auth.register.user'}, registerDto));
    } catch (err) {
      const error = err instanceof Error ? err.message : 'An error occurred during registration';
      throw new RpcException(error);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    return this.clientProxy.send('getProfile', req.user.id);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req: any) {
    return this.clientProxy.send('refresh', req.user);
  }
}
