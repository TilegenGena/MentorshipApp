import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskDTO as TaskInterface } from './task.interface';
import { Request as RequestType } from 'express';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('')
  async getTask(@Request() req: RequestType): Promise<TaskInterface[]> {
    if (req.user) {
      const userId = req.user?.id;
      return this.taskService.getAllTasks(userId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Get(':menteeId')
  async getTaskForMentee(
    @Param('menteeId') menteeId: number,
  ): Promise<TaskInterface[]> {
    return this.taskService.getAllTasks(menteeId);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('')
  async createTask(
    @Request() req: RequestType,
    @Body() taskData: Task,
  ): Promise<Task> {
    const userId = req.user?.id;
    if (userId) {
      return this.taskService.createTask(taskData, userId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() taskData: Task,
  ): Promise<Task> {
    return this.taskService.updateTask(id, taskData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}
