import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // ✅ Swagger

export class CreateProductDto {
  @ApiProperty({ description: 'Nome do produto' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Descrição do produto' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'Preço do produto' })
  @IsNumber()
  @Min(0.01)
  price: number;
}
