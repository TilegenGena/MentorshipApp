// Keep in sync with client interfaces/task.ts

export interface TaskDTO {
  id: number;
  title: string;
  menteeId: number;
  description: string;
  status: string;
  dueDate: string;
}

export interface TaskCreateDTO {
  title: string;
  menteeId: number;
  description: string;
  status: string;
  dueDate: string;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskUpdateDTO {
  id: number;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}
