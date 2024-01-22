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
  tableName: 'mentorship_request',
})
export class MentorshipRequest extends Model<MentorshipRequest> {
  private static PENDING = 'Pending';
  private static RESOLVED = 'Resolved';

  private static MENTORSHIP_REQUEST_STATUS = DataType.ENUM(
    MentorshipRequest.PENDING,
    MentorshipRequest.RESOLVED,
  );

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  menteeId: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  mentorId: number;

  @Column(DataType.TEXT)
  requestMessage: string;

  @Column({ type: MentorshipRequest.MENTORSHIP_REQUEST_STATUS })
  requestStatus: string;

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;
}
