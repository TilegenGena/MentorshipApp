import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('mentorship')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('users')
  async findAll() {
    return this.userService.findAllUsers();
  }
}
