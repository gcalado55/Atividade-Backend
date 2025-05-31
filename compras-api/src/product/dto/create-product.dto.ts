import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0.01, { message: 'O preço deve ser maior que zero' })
  price: number;
}
