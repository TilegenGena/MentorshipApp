import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User as MyUser } from '../modules/user/user.model';

// Update the Express User type (which is empty by default) to include all
// properties from Employee (since that's the return type of
// LocalStrategy.validate):
declare global {
  namespace Express {
    interface User extends MyUser {}
  }
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    const options: IStrategyOptions = {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    };
    super(options);
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.getValidatedUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
