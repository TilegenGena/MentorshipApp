import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { MentorshipRequestModule } from './mentorship-request/mentorship-request.module';

@Module({
  imports: [TaskModule, UserModule, MentorshipRequestModule],
})
export class Modules {}
