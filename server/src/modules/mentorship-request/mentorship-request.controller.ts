import { Body, Controller, Post } from '@nestjs/common';
import { MentorshipRequestService } from './mentorship-request.service';
import { MentorshipRequestCreateDTO } from './mentorship-request';
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
}
