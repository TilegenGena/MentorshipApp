import {
  Controller,
  Get,
  Param,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { MentorshipResponseDTOGet } from './mentorship-response';
import { MentorshipResponseService } from './mentorship-response.service';
import { Request as RequestType } from 'express';

@Controller('mentorship-response')
export class MentorshipResponseController {
  constructor(private mentorshipResponse: MentorshipResponseService) {}

  @Get('get-responses-for-mentee')
  getResponsesForMentee(
    @Request() req: RequestType,
  ): Promise<MentorshipResponseDTOGet[] | null> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.mentorshipResponse.getResponsesForMentee(req.user.id);
  }

  @Post('set-response-as-seen/:responseId')
  setResponseAsSeen(@Param('responseId') responseId: number): Promise<void> {
    return this.mentorshipResponse.setResponseStatusAsSeenByMentee(responseId);
  }
}
