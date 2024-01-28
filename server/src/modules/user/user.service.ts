import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Mentorship } from '../mentorship/mentorship.model';
import { PasswordHash } from 'src/auth/password-hash';
import { Model } from 'sequelize-typescript';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async getAllMentors(): Promise<User[]> {
    return User.findAll({ where: { userType: 'Mentor' } });
  }

  async getMenteesForMentors(mentorId: number): Promise<any[]> {
    const mentorships = await Mentorship.findAll({
      // TODO: Replace with the logged in mentorId
      where: { mentorId },
      include: [
        {
          model: User,
          as: 'mentee',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });
    const mentees = mentorships.map((m) => m.mentee);

    return mentees;
  }

  async createUser(user: any): Promise<User> {
    const pass = await PasswordHash.fromPassword(user.password);
    user.passwordHash = pass;
    return this.userModel.create(user);
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

  async getPasswordHashById(id: number): Promise<PasswordHash | null> {
    const userWithOnlyPasswordHash = (await this.userModel.findByPk(id, {
      attributes: ['passwordHash'],
    })) as (Model & { passwordHash: PasswordHash }) | null;

    if (!userWithOnlyPasswordHash) {
      return null;
    }

    return userWithOnlyPasswordHash.passwordHash;
  }
}
