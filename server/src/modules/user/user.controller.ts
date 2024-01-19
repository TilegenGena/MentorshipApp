import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('mentorship')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('mentors')
  async findAllMentors() {
    return this.userService.getAllMentors();
  }

  @Get('users')
  async AllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() userData: User,
  ): Promise<User> {
    return this.userService.updateUser(id, userData);
  }
}
