import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsOptional()
  @IsString()
  imageUrl: string

  @IsNumber()
  @IsNotEmpty()
  stockQuantity: number
}

export class UpdateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  @IsString()
  imageUrl: string

  @IsNumber()
  @IsNotEmpty()
  stockQuantity: number

}