import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('log_in')
  async logIn(@Body() body: Record<string, any>): Promise<User | null> {
    return this.authService.getValidatedUser(body.email, body.password);
  }

  // @Post('/log_out')
  // async logOut(): void
}
