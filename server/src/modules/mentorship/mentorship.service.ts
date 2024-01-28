import { Injectable, NotFoundException } from '@nestjs/common';
import {
  MentorshipResponse,
  MentorshipResponseDecision,
} from '../mentorship-response/mentorship-response.model';
import { Mentorship } from './mentorship.model';
import {
  MentorshipRequest,
  RequestStatus,
} from '../mentorship-request/mentorship-request.model';

@Injectable()
export class MentorshipService {
  async createMentorship(id: number): Promise<any> {
    const request = await MentorshipRequest.findOne({
      where: { id },
      include: { model: MentorshipResponse, as: 'mentorshipResponse' },
    });
    if (request) {
      await MentorshipResponse.create({
        requestId: request.id,
        responseStatus: MentorshipResponseDecision.ACCEPTED,
      } as MentorshipResponse);

      request.set({ requestStatus: RequestStatus.RESOLVED });
      await request.save();

      await Mentorship.create<Mentorship>({
        menteeId: request.menteeId,
        mentorId: request.mentorId,
        startDate: request.startDate,
        endDate: request.endDate,
      } as Mentorship);
    } else {
      throw new NotFoundException(`Request is not found`);
    }
  }
}
