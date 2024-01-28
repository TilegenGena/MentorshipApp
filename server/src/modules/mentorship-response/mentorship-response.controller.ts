import { Controller, Get, Param } from '@nestjs/common';
import { MentorshipResponseDTOGet } from './mentorship-response';
import { MentorshipResponseService } from './mentorship-response.service';

@Controller('mentorship-response')
export class MentorshipResponseController {
  constructor(private mentorshipResponse: MentorshipResponseService) {}

  @Get('get-responses-for-mentee')
  getResponsesForMentee(
    @Param('menteeId') menteeId: number,
  ): Promise<MentorshipResponseDTOGet[] | null> {
    return this.mentorshipResponse.getResponsesForMentee(menteeId);
  }
}
