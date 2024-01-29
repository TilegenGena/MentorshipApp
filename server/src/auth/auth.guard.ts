import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request as RequestType } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestType>();
    return request.isAuthenticated();
  }
}
