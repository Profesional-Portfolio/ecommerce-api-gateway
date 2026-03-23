import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { RABBIT_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { AddCartItemDto, UpdateCartItemDto } from "./dto";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("cart")
export class CartController {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get(":cartId")
  getCart(@Param("cartId") cartId: string) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "get.cart" }, { cartId })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post()
  addItem(@Body() addCartItemDto: AddCartItemDto) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "add.cart.item" }, addCartItemDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Patch()
  updateItem(@Body() updateCartItemDto: UpdateCartItemDto) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "update.cart.item" }, updateCartItemDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Delete(":cartId/item/:productId")
  removeItem(
    @Param("cartId") cartId: string,
    @Param("productId") productId: string,
  ) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "remove.cart.item" }, { cartId, productId })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Delete(":cartId")
  clearCart(@Param("cartId") cartId: string) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "clear.cart" }, { cartId })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
