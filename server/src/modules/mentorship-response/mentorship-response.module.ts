import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MentorshipResponse } from './mentorship-response.model';
import { MentorshipResponseService } from './mentorship-response.service';
import { MentorshipResponseController } from './mentorship-response.controller';

@Module({
  imports: [SequelizeModule.forFeature([MentorshipResponse])],
  providers: [MentorshipResponseService],
  controllers: [MentorshipResponseController],
})
export class MentorshipResponseModule {}
