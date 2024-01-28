import { Injectable } from '@nestjs/common';
import { MentorshipResponseDTOGet } from './mentorship-response';
import {
  MentorshipRequest,
  RequestStatus,
} from '../mentorship-request/mentorship-request.model';
import {
  MentorshipResponse,
  MentorshipResponseDecision,
} from './mentorship-response.model';

@Injectable()
export class MentorshipResponseService {
  async getResponsesForMentee(
    menteeId: number,
  ): Promise<MentorshipResponseDTOGet[] | null> {
    const request = await MentorshipRequest.findAll({
      where: { requestMessage: RequestStatus.PENDING, menteeId },
      include: [{ model: MentorshipResponse, as: 'mentorshipResponse' }],
    });
    const responses = request.map(
      (mentorshipResponses) => mentorshipResponses.mentorshipResponse,
    );
    return responses.filter(
      (responses) =>
        responses.responseStatus == MentorshipResponseDecision.PENDING,
    );
  }
}
