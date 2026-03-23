import { BasePaginationDto } from "../../../common/dto";
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum";

export class OrdersPaginatinDto extends BasePaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Status must be one of ${OrderStatusList.join(", ")}`,
  })
  status!: OrderStatus;
}
