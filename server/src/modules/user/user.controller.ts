import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';
import { PublicRoute } from 'src/auth/public-route';
import { Request as RequestType } from 'express';

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  bio: string;
  userType: string;
}
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @PublicRoute()
  @Post('user-create')
  async createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  @Get('mentors')
  async findAllMentors() {
    return this.userService.getAllMentors();
  }

  @Get('mentees-for-mentor')
  async getMenteesForMentors(@Request() req: RequestType) {
    if (req.user) {
      return this.userService.getMenteesForMentors(req.user.id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get('')
  async AllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Put('')
  async updateUser(
    @Request() req: RequestType,
    @Body() userData: User,
  ): Promise<User> {
    if (req.user) {
      return this.userService.updateUser(req.user.id, userData);
    } else {
      throw new UnauthorizedException();
    }
  }
}
