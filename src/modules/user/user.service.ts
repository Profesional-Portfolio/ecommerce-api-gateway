import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { RABBIT_SERVICE } from "../config/services";

@Injectable()
export class UserService {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  async findAll(query: any) {
    return firstValueFrom(
      this.clientProxy.send({ cmd: "users.get.all" }, query),
    );
  }

  async findOne(id: string) {
    return firstValueFrom(
      this.clientProxy.send({ cmd: "users.find.one" }, { id }),
    );
  }

  async create(createUserDto: any) {
    return firstValueFrom(
      this.clientProxy.send({ cmd: "users.create.one" }, createUserDto),
    );
  }

  async update(id: string, updateUserDto: any, user: any) {
    return firstValueFrom(
      this.clientProxy.send(
        { cmd: "users.update.one" },
        { id, updateUserDto, user },
      ),
    );
  }

  async remove(id: string, user: any) {
    return firstValueFrom(
      this.clientProxy.send({ cmd: "users.remove.one" }, { id, user }),
    );
  }
}
