import { Injectable } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  getAllMentors(): Promise<User[]> {
    return User.findAll({ where: { userType: 'Mentor' } });
  }
}
