import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Nome do usuário' })
  name: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'E-mail do usuário (único)' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Senha (hash)' })
  password: string;
}
