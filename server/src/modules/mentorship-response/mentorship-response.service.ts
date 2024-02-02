import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MentorshipRequest,
  RequestStatus,
} from '../mentorship-request/mentorship-request.model';
import { MentorshipResponse } from './mentorship-response.model';
import { User } from '../user/user.model';

@Injectable()
export class MentorshipResponseService {
  async getResponsesForMentee(menteeId: number): Promise<any> {
    const requests = await MentorshipRequest.findAll({
      where: { requestStatus: RequestStatus.RESOLVED, menteeId },
      include: [
        { model: MentorshipResponse, as: 'mentorshipResponse' },
        { model: User, as: 'mentor' },
      ],
    });

    const mentorshipResponses = requests.map((mentorshipRequest) => ({
      response: mentorshipRequest.mentorshipResponse,
      mentor: mentorshipRequest.mentor,
    }));

    const unseenResponses = mentorshipResponses.filter(
      (item) => !item.response?.response_seen_by_value,
    );

    return unseenResponses;
  }

  async setResponseStatusAsSeenByMentee(responseId: number): Promise<void> {
    const response = await MentorshipResponse.findOne({
      where: { id: responseId },
    });
    if (response) {
      response.response_seen_by_value = true;
      await response.save();
    } else {
      throw new NotFoundException();
    }
  }
}
