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
import { Op } from 'sequelize';
import { User } from '../user/user.model';

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
        response_seen_by_value: false,
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

  async declineMentorship(id: number): Promise<void> {
    const request = await MentorshipRequest.findOne({
      where: { id },
      include: { model: MentorshipResponse, as: 'mentorshipResponse' },
    });
    if (request) {
      await MentorshipResponse.create({
        requestId: request.id,
        responseStatus: MentorshipResponseDecision.DECLINED,
        response_seen_by_value: false,
      } as MentorshipResponse);
      request.set({ requestStatus: RequestStatus.RESOLVED });
      await request.save();
    } else {
      throw new NotFoundException('Request is not found');
    }
  }

  async getCurrentMentorship(menteeId: number): Promise<any> {
    try {
      const currentDate = new Date();
      const currentMentorship = await Mentorship.findOne({
        where: {
          menteeId,
          startDate: { [Op.lte]: currentDate },
          endDate: { [Op.gte]: currentDate },
        },
        include: [
          {
            model: User,
            as: 'mentor',
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'userType',
              'bio',
            ],
          },
          {
            model: User,
            as: 'mentee',
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'userType',
              'bio',
            ],
          },
        ],
      });

      return currentMentorship;
    } catch (error) {
      console.error('Error fetching current mentorship:', error);
      throw error;
    }
  }
}
