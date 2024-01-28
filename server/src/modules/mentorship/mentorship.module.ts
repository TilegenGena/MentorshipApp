import { Module } from '@nestjs/common';
import { MentorshipService } from './mentorship.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Mentorship } from './mentorship.model';
import { MentorshipController } from './mentorship.controller';

@Module({
  imports: [SequelizeModule.forFeature([Mentorship])],
  providers: [MentorshipService],
  controllers: [MentorshipController],
})
export class MentorshipModule {}
