import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../task/task.model';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class User extends Model<User> {
  protected static MENTOR = 'Mentor';
  private static MENTEE = 'Mentee';

  private static USER_TYPE = DataType.ENUM(User.MENTOR, User.MENTEE);

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
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    unique: true,
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bio: string;

  @Column({
    type: User.USER_TYPE,
    allowNull: false,
  })
  userType: string;

  @HasMany(() => Task)
  tasks: Task[];
}
