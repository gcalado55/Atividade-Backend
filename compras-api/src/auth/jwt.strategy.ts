import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Lê o token do cabeçalho
      ignoreExpiration: false,
      secretOrKey: 'jwt-secret', // 🔒 Em produção, usar variável de ambiente
    });
  }

  // O retorno será atribuído ao `req.user` nas rotas protegidas
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
