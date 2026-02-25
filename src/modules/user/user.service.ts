import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RABBIT_SERVICE } from '../config/services';

@Injectable()
export class UserService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly client: ClientProxy,
  ) {}

  async findAll(query: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.findAll' }, query));
    } catch (error) {
      throw new HttpException('Error al obtener usuarios del microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.findOne' }, { id }));
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.create' }, createUserDto));
    } catch (error) {
      throw new HttpException('Error al crear usuario en el microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async update(id: string, updateUserDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.update' }, { id, ...updateUserDto }));
    } catch (error) {
      throw new HttpException('Error al actualizar usuario en el microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async remove(id: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'user.remove' }, { id }));
    } catch (error) {
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
