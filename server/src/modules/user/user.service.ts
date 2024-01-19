import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async getAllMentors(): Promise<User[]> {
    return User.findAll({ where: { userType: 'Mentor' } });
  }

  async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, userData: User): Promise<User> {
    await this.userModel.update(userData, {
      where: { id },
    });

    return this.getUserById(id);
  }
}
