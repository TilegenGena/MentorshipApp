import { Body, Controller, Param, Post } from '@nestjs/common';
import { MentorshipService } from './mentorship.service';

@Controller('mentorship-accept')
export class MentorshipController {
  constructor(private mentorship: MentorshipService) {}

  @Post('one')
  async createMentorshipRequest(
    @Body() requestId: { requestId: number },
  ): Promise<void> {
    await this.mentorship.createMentorship(requestId.requestId);
  }
}
