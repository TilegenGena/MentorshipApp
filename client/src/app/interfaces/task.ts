export interface ITask {
  id: number;
  title: string;
  menteeId: number;
  description: string;
  status: string;
  dueDate: Date;
}
