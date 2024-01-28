import { Module } from '@nestjs/common';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
import { MentorshipRequestModule } from './mentorship-request/mentorship-request.module';
import { MentorshipResponseModule } from './mentorship-response/mentorship-response.module';
import { MentorshipModule } from './mentorship/mentorship.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TaskModule,
    UserModule,
    MentorshipRequestModule,
    MentorshipModule,
    MentorshipResponseModule,
    AuthModule,
  ],
})
export class Modules {}
