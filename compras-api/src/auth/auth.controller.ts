import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário e geração do token JWT' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso e token retornado' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'usuario@email.com' },
        password: { type: 'string', example: 'senhaSegura123' },
      },
      required: ['email', 'password'],
    },
  })
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    return this.authService.login(body.email, body.password);
  }
}
