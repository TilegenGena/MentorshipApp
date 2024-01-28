import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';
import { AuthService } from './auth.service';
import { Request as RequestType } from 'express';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('log_in')
  // async logIn(@Request() req: RequestType): User {
  //   return req.user!;

  // return this.authService.getValidatedUser(body.email, body.password);
  // }

  @UseGuards(LocalAuthGuard)
  @Post('log_in')
  logIn(@Request() req: RequestType): User {
    return req.user!;
  }

  // @Post('/log_out')
  // async logOut(): void
}
