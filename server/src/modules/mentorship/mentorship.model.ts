import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'mentorship',
})
export class Mentorship extends Model<Mentorship> {
  private static ACTIVE = 'Active';
  private static COMPLETED = 'Completed';

  private static MENTORSHIP_STATUS = DataType.ENUM(
    Mentorship.ACTIVE,
    Mentorship.COMPLETED,
  );

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  mentorId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  menteeId: number;

  @Column({ type: Mentorship.MENTORSHIP_STATUS })
  status: string;

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;
}
