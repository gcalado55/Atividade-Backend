import { IsInt, Min } from 'class-validator';

export class AddProductDto {
  @IsInt()
  @Min(1)
  quantity: number;
}