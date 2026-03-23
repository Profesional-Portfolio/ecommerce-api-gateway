import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
} from "class-validator";

export class AddCartItemDto {
  @IsString()
  @IsNotEmpty()
  cartId!: string;

  @IsString()
  @IsNotEmpty()
  productId!: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}
