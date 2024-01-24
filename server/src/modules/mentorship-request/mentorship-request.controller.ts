import { Body, Controller, Post } from '@nestjs/common';
import { MentorshipRequestService } from './mentorship-request.service';
import { MentorshipRequestCreateDTO } from './mentorship-request';
import { MentorshipRequest } from './mentorship-request.model';

@Controller('mentorship-request')
export class MentorshipRequestController {
  constructor(private mentorshipRequestService: MentorshipRequestService) {}

  @Post('')
  async createTask(
    @Body() taskData: MentorshipRequest,
  ): Promise<MentorshipRequestCreateDTO> {
    return this.mentorshipRequestService.createMentorshipRequest(taskData);
  }
}
