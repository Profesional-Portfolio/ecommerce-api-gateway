import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Inject,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";
import { RABBIT_SERVICE } from "../config";
import { ClientProxy, RpcException } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError } from "rxjs";

@Controller("products")
export class ProductController {
  constructor(
    @Inject(RABBIT_SERVICE) private readonly clientProxy: ClientProxy,
  ) {}

  @Get()
  async findAll(@Query() query: any) {
    // return this.productService.findAll(query);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "find.all.products" }, query)
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    // return this.productService.findOne(id);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "find.one.product" }, { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async create(@Body() createProductDto: any) {
    // return this.productService.create(createProductDto);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "create.product" }, { createProductDto })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async update(@Param("id") id: string, @Body() updateProductDto: any) {
    // return this.productService.update(id, updateProductDto);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "update.product" }, { id, ...updateProductDto })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async remove(@Param("id") id: string) {
    // return this.productService.remove(id);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "remove.product" }, { id })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Get("category/:category")
  async findByCategory(
    @Param("category") category: string,
    @Query() query: any,
  ) {
    // return this.productService.findByCategory(category, query);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "find.product.by.category" }, { category, ...query })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }

  @Post(":id/reviews")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "user")
  async addReview(@Param("id") id: string, @Body() reviewDto: any) {
    // return this.productService.addReview(id, reviewDto);
    await firstValueFrom(
      this.clientProxy
        .send({ cmd: "add.product.review" }, { id, reviewDto })
        .pipe(catchError((error) => throwError(() => new RpcException(error)))),
    );
  }
}
