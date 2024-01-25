import { Injectable } from '@nestjs/common';
import { MentorshipRequestCreateDTO } from './mentorship-request';
import { MentorshipRequest } from './mentorship-request.model';
import { User } from '../user/user.model';

@Injectable()
export class MentorshipRequestService {
  constructor() {}

  async createMentorshipRequest(
    mentorshipRequest: MentorshipRequest,
  ): Promise<void> {
    const user = await User.findAll();
    mentorshipRequest.menteeId = user[0].id;
    // TODO: Replace with the actual logged in menteeId
    await MentorshipRequest.create(mentorshipRequest);
  }
}
