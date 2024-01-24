import { Injectable } from '@nestjs/common';
import { MentorshipRequestCreateDTO } from './mentorship-request';
import { MentorshipRequest } from './mentorship-request.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/user.model';
const Sequelize = require('sequelize');

@Injectable()
export class MentorshipRequestService {
  constructor() {}

  async createMentorshipRequest(
    mentorshipRequest: MentorshipRequest,
  ): Promise<MentorshipRequestCreateDTO> {
    const user = await User.findAll();
    mentorshipRequest.menteeId = user[0].id;
    // TODO: Replace with the actual logged in menteeId
    return MentorshipRequest.create(mentorshipRequest);
  }
}
