import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/modules/user/user.model';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async getValidatedUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }
    const pass = await this.userService.getPasswordHashById(user.id);
    const isSamePass = await pass?.isCorrectPassword(password);
    if (isSamePass) {
      return user;
    } else {
      throw new UnauthorizedException('Password is not correct');
    }
  }
}
