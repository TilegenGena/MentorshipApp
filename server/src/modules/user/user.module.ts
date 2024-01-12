import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { TaskModule } from '../task/task.module';
import { UserController } from './user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User]), TaskModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
