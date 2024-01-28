import {
  Model,
  Column,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table({
  tableName: 'mentorship',
  timestamps: true,
})
export class Mentorship extends Model<Mentorship> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  mentorId: number;

  @BelongsTo(() => User, { foreignKey: { name: 'mentorId' } })
  mentor: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  menteeId: number;

  @BelongsTo(() => User, { foreignKey: { name: 'menteeId' } })
  mentee: User;

  @Column({ type: DataType.DATE, allowNull: false })
  startDate: string;

  @Column({ type: DataType.DATE, allowNull: false })
  endDate: string;
}
