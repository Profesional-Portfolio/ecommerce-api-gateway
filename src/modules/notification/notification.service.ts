import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RABBIT_SERVICE } from '../config/services';

@Injectable()
export class NotificationService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly client: ClientProxy,
  ) {}

  async findAll(userId: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'notification.findAll' }, { userId }));
    } catch (error) {
      throw new HttpException('Error al obtener notificaciones del microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async send(sendNotificationDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'notification.send' }, sendNotificationDto));
    } catch (error) {
      throw new HttpException('Error al enviar notificación en el microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async markAsRead(id: string, userId: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'notification.markAsRead' }, { id, userId }));
    } catch (error) {
      throw new HttpException('Notificación no encontrada', HttpStatus.NOT_FOUND);
    }
  }

  async getUnreadCount(userId: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'notification.getUnreadCount' }, { userId }));
    } catch (error) {
      throw new HttpException('Error al obtener contador de notificaciones no leídas', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }
}
