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
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { RolesGuard } from "../../common/guards/roles.guard";
import { Roles } from "../../common/decorators/roles.decorator";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async findAll(@Query() query: any) {
    return this.userService.findAll(query);
  }

  @Get(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "user")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "user")
  async update(
    @Param("id") id: string,
    @Body() updateUserDto: any,
    @Request() req: any,
  ) {
    return this.userService.update(id, updateUserDto, req.user);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin")
  async remove(@Param("id") id: string, @Request() req: any) {
    return this.userService.remove(id, req.user);
  }
}
