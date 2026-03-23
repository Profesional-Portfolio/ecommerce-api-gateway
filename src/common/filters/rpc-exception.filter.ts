import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

@Catch()
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseBody = exception.getResponse();
      message =
        typeof responseBody === "object"
          ? (responseBody as any).message || exception.message
          : responseBody;
    } else if (
      exception instanceof RpcException ||
      (exception.status && exception.message)
    ) {
      // Handle RpcException which often contains an object with status and message
      const rpcError =
        exception instanceof RpcException ? exception.getError() : exception;

      if (typeof rpcError === "object" && rpcError !== null) {
        status = (rpcError as any).status || HttpStatus.BAD_REQUEST;
        message = (rpcError as any).message || "Microservice error";
      } else {
        message = String(rpcError);
      }
    }

    response.status(status).json({
      success: false,
      message,
      statusCode: status,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
