import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MentorshipRequest } from './mentorship-request.model';
import { MentorshipRequestService } from './mentorship-request.service';
import { MentorshipRequestController } from './mentorship-request.controller';

@Module({
  imports: [SequelizeModule.forFeature([MentorshipRequest])],
  providers: [MentorshipRequestService],
  controllers: [MentorshipRequestController],
})
export class MentorshipRequestModule {}
