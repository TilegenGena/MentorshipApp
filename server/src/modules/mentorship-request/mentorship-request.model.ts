import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { MentorshipResponse } from '../mentorship-response/mentorship-response.model';

export enum RequestStatus {
  PENDING = 'Pending',
  RESOLVED = 'Resolved',
}
@Table({
  tableName: 'mentorship_request',
  timestamps: true,
})
export class MentorshipRequest extends Model<MentorshipRequest> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  menteeId: number;

  @BelongsTo(() => User, { foreignKey: { name: 'menteeId' } })
  mentee: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  mentorId: number;

  @BelongsTo(() => User, { foreignKey: { name: 'mentorId' } })
  mentor: User;

  @Column({ type: DataType.TEXT, allowNull: false })
  requestMessage: string;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: string;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: string;

  @Column({ type: DataType.ENUM(...Object.values(RequestStatus)) })
  requestStatus: RequestStatus;

  @HasOne(() => MentorshipResponse)
  mentorshipResponse: MentorshipResponse;
}
