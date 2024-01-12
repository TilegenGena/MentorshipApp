import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../task/task.model';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({
    unique: true,
  })
  email: string;

  @HasMany(() => Task)
  tasks: Task[];
}
