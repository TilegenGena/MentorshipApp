import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'task',
  timestamps: true,
})
export class Task extends Model<Task> {
  public static TO_DO = 'To Do';
  public static IN_PROGRESS = 'In Progress';
  public static STUCK = 'Stuck';
  public static DONE = 'Done';

  public static TASK_STATUS = DataType.ENUM(
    Task.TO_DO,
    Task.IN_PROGRESS,
    Task.STUCK,
    Task.DONE,
  );

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  mentee_id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  task_description: string;

  @Column({
    type: Task.TASK_STATUS,
    allowNull: false,
  })
  task_status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  due_date: Date;
}
