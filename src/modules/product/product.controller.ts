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
  Request,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@Controller("products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.productService.findAll(query);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async create(@Body() createProductDto: any) {
    return this.productService.create(createProductDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async update(@Param("id") id: string, @Body() updateProductDto: any) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async remove(@Param("id") id: string) {
    return this.productService.remove(id);
  }

  @Get("category/:category")
  async findByCategory(
    @Param("category") category: string,
    @Query() query: any,
  ) {
    return this.productService.findByCategory(category, query);
  }

  @Post(":id/reviews")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "user")
  async addReview(@Param("id") id: string, @Body() reviewDto: any) {
    return this.productService.addReview(id, reviewDto);
  }
}
