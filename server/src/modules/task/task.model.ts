import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'task',
  timestamps: true,
})
export class Task extends Model<Task> {
  private static TO_DO = 'To Do';
  private static IN_PROGRESS = 'In Progress';
  private static STUCK = 'Stuck';
  private static DONE = 'Done';

  private static TASK_STATUS = DataType.ENUM(
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
  title: string;

  @BelongsTo(() => User, { foreignKey: { name: 'menteeId' } })
  mentee: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  menteeId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: Task.TASK_STATUS,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate: Date;

  @Column({
    type: DataType.BOOLEAN,
  })
  archived: boolean;
}
