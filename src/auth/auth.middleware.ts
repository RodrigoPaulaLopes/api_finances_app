import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) { }

  async use(req: any, res: any, next: () => void) {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length);

      try {
        const decoded = await this.jwtService.verifyAsync(token);
        req.user = decoded; 
        next(); 
      } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'Missing token' });
    }

  }
}
