export interface TaskDTO {
  id: number;
  name: string;
  mentee_id: number;
  task_description: string;
  task_status: string;
  due_date: Date;
}
