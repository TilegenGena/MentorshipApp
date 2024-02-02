import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { MentorshipRequestService } from './mentorship-request.service';
import { MentorshipRequestGetDTO } from './mentorship-request';
import { MentorshipRequest } from './mentorship-request.model';
import { Request as RequestType } from 'express';

@Controller('mentorship-request')
export class MentorshipRequestController {
  constructor(private mentorshipRequestService: MentorshipRequestService) {}

  @Post('')
  async createMentorshipReques(
    @Request() req: RequestType,
    @Body() mentorshipRequestData: MentorshipRequest,
  ): Promise<void> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    await this.mentorshipRequestService.createMentorshipRequest(
      mentorshipRequestData,
      req.user.id,
    );
  }

  @Get('requests')
  getNewMentorshipRequests(
    @Request() req: RequestType,
  ): Promise<MentorshipRequestGetDTO[] | null> {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.mentorshipRequestService.getRequestsForMentor(req.user.id);
  }
}
