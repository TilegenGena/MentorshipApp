import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { MentorshipRequest } from '../mentorship-request/mentorship-request.model';

export enum MentorshipResponseDecision {
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
  PENDING = 'Pending',
}
@Table({
  tableName: 'mentorship_response',
  timestamps: true,
  indexes: [{ name: 'request_unique', unique: true, fields: ['requestId'] }],
})
export class MentorshipResponse extends Model<MentorshipResponse> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => MentorshipRequest)
  @Column({ type: DataType.INTEGER, allowNull: false })
  requestId: number;

  @BelongsTo(() => MentorshipRequest, { foreignKey: { name: 'requestId' } })
  request: MentorshipRequest;

  @Column({ type: DataType.TEXT, allowNull: true })
  responseMessage: string;

  @Column({
    type: DataType.ENUM(...Object.values(MentorshipResponseDecision)),
    allowNull: true,
  })
  responseStatus: MentorshipResponseDecision;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  response_seen_by_value: boolean;
}
