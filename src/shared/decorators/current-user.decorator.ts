import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export interface ICurrentUser {
  sub: string;
  email: string;
  iat: number;
  exp: number;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader =
      request.headers['authorization'] || request.headers['Authorization'];
    if (
      authHeader &&
      typeof authHeader === 'string' &&
      authHeader.startsWith('Bearer ')
    ) {
      const token = authHeader.slice(7);
      try {
        const secret = process.env.PRIVATE_KEY;
        if (!secret) {
          throw new Error('JWT secret key (PRIVATE_KEY) is not defined');
        }
        const decoded = jwt.verify(token, secret) as unknown as ICurrentUser;
        return decoded;
      } catch (e) {
        console.log(e);
        return null;
      }
    }
    return null;
  },
);
