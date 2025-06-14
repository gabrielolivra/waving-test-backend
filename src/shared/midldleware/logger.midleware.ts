import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, body } = req;
    this.logger.log(`[Request] ${method} ${originalUrl}`);
    this.logger.log('Body: ' + JSON.stringify(body));

    next();
  }
}
