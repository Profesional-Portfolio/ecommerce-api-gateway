import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './modules/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para permitir conexiones desde diferentes orígenes
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  // Configurar validación global
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');
  
  await app.listen(env.PORT);
  
  console.log(`🚀 API Gateway ejecutándose en puerto ${env.PORT}`);
  console.log(`📊 Documentación disponible en http://localhost:${env.PORT}/api/v1`);
}

bootstrap();
