import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  PrimaryKey,
  AutoIncrement,
} from 'sequelize-typescript';
import { MentorshipRequest } from '../mentorship-request/mentorship-request.model';

@Table({ tableName: 'mentorship_response' })
export class MentorshipResponse extends Model<MentorshipResponse> {
  private static ACCEPTED = 'Accepted';
  private static DECLINED = 'Declined';

  private static MENTORSHIP_RESPONSE_STATUS = DataType.ENUM(
    MentorshipResponse.ACCEPTED,
    MentorshipResponse.DECLINED,
  );

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => MentorshipRequest)
  @Column(DataType.INTEGER)
  requestId: number;

  @Column(DataType.TEXT)
  responseMessage: string;

  @Column({ type: MentorshipResponse.MENTORSHIP_RESPONSE_STATUS })
  responseStatus: string;
}
