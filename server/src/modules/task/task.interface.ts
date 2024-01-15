export interface TaskDTO {
  id: number;
  title: string;
  menteeId: number;
  description: string;
  status: string;
  dueDate: Date;
}
