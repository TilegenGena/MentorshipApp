import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';
import { AuthService } from './auth.service';
import { Request as RequestType } from 'express';
import { PublicRoute } from './public-route';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @PublicRoute()
  @UseGuards(LocalAuthGuard)
  @Post('log_in')
  logIn(@Request() req: RequestType): User {
    return req.user!;
  }

  @Post('/log_out')
  logOut(@Request() req: RequestType): void {
    req.logOut(() => null);
  }

  @PublicRoute()
  @Get('get_logged_in_user')
  getLoggedInUser(@Request() req: RequestType): User | null {
    return req.user!;
  }
}
