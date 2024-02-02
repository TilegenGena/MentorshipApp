import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { Request as RequestType } from 'express';

@Controller('mentorship')
export class MentorshipController {
  constructor(private mentorship: MentorshipService) {}

  @Post('accept')
  async createMentorship(
    @Body() requestId: { requestId: number },
  ): Promise<void> {
    await this.mentorship.createMentorship(requestId.requestId);
  }

  @Post('decline')
  async declineMentorship(
    @Body() requestId: { requestId: number },
  ): Promise<void> {
    await this.mentorship.declineMentorship(requestId.requestId);
  }

  @Get('')
  getCurrentMentorship(@Request() req: RequestType): Promise<any> {
    if (req.user) {
      return this.mentorship.getCurrentMentorship(req.user.id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
