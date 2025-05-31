import { IsInt, Min } from 'class-validator';

export class AddProductDto {
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(1, { message: 'A quantidade mínima é 1' })
  quantity: number;
}