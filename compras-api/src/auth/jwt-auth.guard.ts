import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Esse guard usa a estratégia 'jwt' definida no JwtStrategy
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
