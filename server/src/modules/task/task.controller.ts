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
import { TaskCreateDTO, TaskDTO, TaskUpdateDTO } from './task.interface';
import { Request as RequestType } from 'express';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('')
  async getTask(@Request() req: RequestType): Promise<TaskDTO[]> {
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
  ): Promise<TaskDTO[]> {
    return this.taskService.getAllTasks(menteeId);
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<TaskDTO> {
    return this.taskService.getTaskById(id);
  }

  @Post('')
  async createTask(
    @Request() req: RequestType,
    @Body() taskData: TaskCreateDTO,
  ): Promise<TaskDTO[]> {
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
    @Body() taskData: TaskUpdateDTO,
  ): Promise<TaskDTO[]> {
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
  ): Promise<TaskDTO[]> {
    if (req.user) {
      await this.taskService.deleteTask(id);
      return this.taskService.getAllTasks(req.user.id);
    } else {
      throw new UnauthorizedException();
    }
  }
}
