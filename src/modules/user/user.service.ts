import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";
import { RABBIT_SERVICE } from "../config/services";

@Injectable()
export class UserService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async findAll(query: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "users.get.all" }, query)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async findOne(id: string) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "users.find.one" }, { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async create(createUserDto: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "users.create.one" }, createUserDto)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async update(id: string, updateUserDto: any, user: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "users.update.one" }, { id, updateUserDto, user })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  async remove(id: string, user: any) {
    return firstValueFrom(
      this.clientProxy
        .send({ cmd: "users.remove.one" }, { id, user })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
