import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class UpdateCartDto {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
