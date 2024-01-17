import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('mentorship')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('mentors')
  async findAll() {
    return this.userService.getAllMentors();
  }
}
