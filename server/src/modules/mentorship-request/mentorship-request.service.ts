import { Injectable } from '@nestjs/common';
import { MentorshipRequestGetDTO } from './mentorship-request';
import { MentorshipRequest, RequestStatus } from './mentorship-request.model';
import { User } from '../user/user.model';

@Injectable()
export class MentorshipRequestService {
  constructor() {}

  async createMentorshipRequest(
    mentorshipRequest: MentorshipRequest,
  ): Promise<void> {
    const user = await User.findAll();
    mentorshipRequest.menteeId = user[0].id;
    mentorshipRequest.requestStatus = RequestStatus.PENDING;
    // TODO: Replace with the actual logged in menteeId
    await MentorshipRequest.create(mentorshipRequest);
  }

  async getRequestsForMentor(
    mentorId: number,
  ): Promise<MentorshipRequestGetDTO[] | null> {
    return MentorshipRequest.findAll({
      where: { mentorId, requestStatus: RequestStatus.PENDING },
      include: [{ model: User, as: 'mentee' }],
    });
  }
}
