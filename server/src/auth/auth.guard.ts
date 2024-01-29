import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request as RequestType } from 'express';
import { Reflector } from '@nestjs/core';

import { IS_PUBLIC_ROUTE_KEY } from './public-route';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublicRoute = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (isPublicRoute) {
      return true;
    }
    const request = context.switchToHttp().getRequest<RequestType>();
    return request.isAuthenticated();
  }
}
