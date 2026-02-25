import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RABBIT_SERVICE } from '../config/services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: { email: string; password: string }) {
    try {
      const response = await firstValueFrom(this.client.send({ cmd: 'auth.login' }, loginDto));
      const user = response.user || response;
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      };
    } catch (error) {
      throw new HttpException('Credenciales inválidas', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(registerDto: any) {
    try {
      const response = await firstValueFrom(this.client.send({ cmd: 'auth.register' }, registerDto));
      const user = response.user || response;
      const payload = { email: user.email, sub: user.id, roles: user.roles };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          roles: user.roles,
        },
      };
    } catch (error) {
      throw new HttpException('Error al registrar usuario', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async getProfile(userId: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.findOne' }, { id: userId }));
    } catch (error) {
      throw new HttpException('Error al obtener perfil de usuario', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async refreshToken(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
