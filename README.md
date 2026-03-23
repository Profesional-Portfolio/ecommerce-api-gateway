# API Gateway

Punto de entrada único para la plataforma de e-commerce. Maneja la autenticación, validación de tokens JWT y el enrutamiento hacia los microservicios correspondientes.

## 📋 Características
-   🛡️ **Seguridad**: Validación de JWT y políticas de CORS.
-   🚦 **Enrutamiento**: Proxies hacia microservicios de usuarios, productos, etc.
-   📡 **Comunicación**: Traduce peticiones HTTP a mensajes de RabbitMQ cuando es necesario.

## 🛠️ Tecnologías
-   NestJS
-   TypeScript
-   Passport (JWT)
-   RabbitMQ

## 🚀 Configuración
1.  **Variables de Entorno**:
    ```bash
    cp .env.example .env
    ```
2.  **Instalación**:
    ```bash
    pnpm install
    ```
3.  **Ejecución**:
    ```bash
    # Desarrollo
    pnpm run start:dev
    ```

## 📡 API Endpoints Principales
-   `POST /api/v1/auth/register`: Registro de nuevos usuarios.
-   `POST /api/v1/auth/login`: Autenticación y obtención de token.
-   `GET /api/v1/products`: Catálogo de productos.
-   `POST /api/v1/orders`: Creación de pedidos.
