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
  image: string

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
  image: string

}