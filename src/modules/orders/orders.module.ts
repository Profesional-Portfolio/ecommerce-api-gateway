import { Module } from "@nestjs/common";
import { OrdersController } from "./orders.controller";
import { TransportModule } from "../transport/transport.module";

@Module({
  imports: [TransportModule],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
