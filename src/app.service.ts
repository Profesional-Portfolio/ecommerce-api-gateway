import { Injectable } from "@nestjs/common";
import { env } from "./modules/config";

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      name: "Microservices API Gateway",
      version: "1.0.0",
      description: "Gateway para acceder a todos los microservicios",
      endpoints: {
        users: "/api/v1/users",
        products: "/api/v1/products",
        notifications: "/api/v1/notifications",
        auth: "/api/v1/auth",
        cart: "/api/v1/cart",
        orders: "/api/v1/orders",
      },
      status: "running",
      timestamp: new Date().toISOString(),
    };
  }

  getHealth() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: env.NODE_ENV,
    };
  }
}
