import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { RABBIT_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { CreateOrderDto, OrdersPaginatinDto, UpdateStatusDto } from "./dto";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("orders")
export class OrdersController {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "create.order" }, createOrderDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Get()
  findAll(@Query() ordersPaginatinDto: OrdersPaginatinDto) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "find.all.orders" }, ordersPaginatinDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "find.one.order" }, { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
  @Patch(":id/status")
  async updateStatus(
    @Param("id") id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return firstValueFrom(
      this.clientProxy
        .send(
          { cmd: "update.order.status" },
          { id, status: updateStatusDto.status },
        )
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
