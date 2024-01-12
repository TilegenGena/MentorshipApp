import { Injectable } from '@nestjs/common';
import { User } from '../user/user.model';

@Injectable()
export class TaskService {
  async createUser(createUserDto: any): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.username;
    user.email = createUserDto.email;

    return user.save();
  }

  async findAllUsers(): Promise<User[]> {
    return User.findAll();
  }
}
