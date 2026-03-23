import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { TransportModule } from "../transport/transport.module";

@Module({
  imports: [TransportModule],
  controllers: [CartController],
  providers: [],
})
export class CartModule {}
