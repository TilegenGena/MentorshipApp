import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.model';
import { TaskDTO as TaskInterface } from './task.interface';

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('all-task')
  async findAll(): Promise<TaskInterface[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post('task')
  async createTask(@Body() taskData: Task): Promise<Task> {
    return this.taskService.createTask(taskData);
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
