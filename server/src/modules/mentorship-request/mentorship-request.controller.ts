import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MentorshipRequestService } from './mentorship-request.service';
import { MentorshipRequestGetDTO } from './mentorship-request';
import { MentorshipRequest } from './mentorship-request.model';

@Controller('mentorship-request')
export class MentorshipRequestController {
  constructor(private mentorshipRequestService: MentorshipRequestService) {}

  @Post('')
  async createMentorshipReques(
    @Body() mentorshipRequestData: MentorshipRequest,
  ): Promise<void> {
    await this.mentorshipRequestService.createMentorshipRequest(
      mentorshipRequestData,
    );
  }

  @Get('requests/:mentorId')
  getNewMentorshipRequests(
    @Param('mentorId') mentorId: number,
  ): Promise<MentorshipRequestGetDTO[] | null> {
    return this.mentorshipRequestService.getRequestsForMentor(mentorId);
  }
}
