import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Inject,
} from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { RABBIT_SERVICE } from "../config";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Post("login")
  async login(@Body() loginDto: { email: string; password: string }) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "auth.login.user" }, loginDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post("register")
  async register(@Body() registerDto: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "auth.register.user" }, registerDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "auth.profile.user" }, req.user.id)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post("refresh")
  @UseGuards(JwtAuthGuard)
  async refresh(@Request() req: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "auth.refresh.token" }, req.user)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
