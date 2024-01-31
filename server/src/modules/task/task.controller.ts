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
  ): Promise<TaskInterface[]> {
    const userId = req.user?.id;
    if (userId) {
      await this.taskService.createTask(taskData, userId);
      return this.taskService.getAllTasks(userId);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Put(':id')
  async updateTask(
    @Request() req: RequestType,
    @Param('id') id: number,
    @Body() taskData: Task,
  ): Promise<TaskInterface[]> {
    if (req.user) {
      await this.taskService.updateTask(id, taskData);
      return this.taskService.getAllTasks(req.user.id);
    } else {
      throw new UnauthorizedException();
    }
  }

  @Delete(':id')
  async deleteTask(
    @Request() req: RequestType,
    @Param('id') id: number,
  ): Promise<TaskInterface[]> {
    if (req.user) {
      await this.taskService.deleteTask(id);
      return this.taskService.getAllTasks(req.user.id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
