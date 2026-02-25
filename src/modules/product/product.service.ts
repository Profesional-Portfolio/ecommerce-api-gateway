import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RABBIT_SERVICE } from '../config/services';

@Injectable()
export class ProductService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly client: ClientProxy,
  ) {}

  async findAll(query: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.findAll' }, query));
    } catch (error) {
      throw new HttpException('Error al obtener productos del microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.findOne' }, { id }));
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async create(createProductDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.create' }, createProductDto));
    } catch (error) {
      throw new HttpException('Error al crear producto en el microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async update(id: string, updateProductDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.update' }, { id, ...updateProductDto }));
    } catch (error) {
      throw new HttpException('Error al actualizar producto en el microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async remove(id: string) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.remove' }, { id }));
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }

  async findByCategory(category: string, query: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.findByCategory' }, { category, query }));
    } catch (error) {
      throw new HttpException('Error al obtener productos por categoría del microservicio', HttpStatus.SERVICE_UNAVAILABLE);
    }
  }

  async addReview(id: string, reviewDto: any) {
    try {
      return await firstValueFrom(this.client.send({ cmd: 'product.addReview' }, { id, ...reviewDto }));
    } catch (error) {
      throw new HttpException('Producto no encontrado', HttpStatus.NOT_FOUND);
    }
  }
}
