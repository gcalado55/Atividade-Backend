import { IsInt, Min } from 'class-validator';

export class AddProductDto {
  @IsInt()
  @Min(1, { message: 'A quantidade deve ser no mínimo 1' })
  quantity: number;
}
