import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules/user/user.module";
import { ProductModule } from "./modules/product/product.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TransportModule } from "./modules/transport/transport.module";
import { CartModule } from "./modules/cart/cart.module";
import { env } from "./modules/config";

@Module({
  imports: [
    TransportModule,
    HttpModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: "24h" },
    }),
    UserModule,
    ProductModule,
    NotificationModule,
    AuthModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
