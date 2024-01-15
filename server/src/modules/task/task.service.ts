import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.model';
import { InjectModel } from '@nestjs/sequelize';
import { TaskDTO } from './task.interface';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private readonly taskModel: typeof Task,
  ) {}

  async createTask(taskData: Task): Promise<Task> {
    return this.taskModel.create(taskData);
  }

  async getAllTasks(): Promise<TaskDTO[]> {
    return this.taskModel.findAll();
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskModel.findByPk(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, taskData: Task): Promise<Task> {
    await this.taskModel.update(taskData, {
      where: { id },
    });

    return this.getTaskById(id);
  }

  async deleteTask(id: number): Promise<void> {
    await this.taskModel.destroy({
      where: { id },
    });
  }
}
