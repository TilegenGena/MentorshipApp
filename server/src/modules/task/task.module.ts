import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { UserController } from '../user/user.controller';
import { TaskController } from './task.controller';

@Module({
  imports: [SequelizeModule.forFeature([Task])],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
