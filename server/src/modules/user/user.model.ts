import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Task } from '../task/task.model';
import { Mentorship } from '../mentorship/mentorship.model';
import { MentorshipRequest } from '../mentorship-request/mentorship-request.model';
import { PasswordHash } from 'src/auth/password-hash';

export enum UserType {
  MENTOR = 'Mentor',
  MENTEE = 'Mentee',
}

@Table({
  tableName: 'user',
  timestamps: true,
})
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @Column({ unique: true, type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  bio: string;

  @Column({ type: DataType.ENUM(...Object.values(UserType)), allowNull: false })
  userType: UserType;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: 'passwordHash',
    get: function () {
      return PasswordHash.fromHashString(this.getDataValue('passwordHash'));
    },
    set: function (value: PasswordHash) {
      this.setDataValue('passwordHash', value.getHash());
    },
  })
  passwordHash: PasswordHash;

  @HasMany(() => Task)
  tasks: Task[];

  @HasMany(() => Mentorship)
  mentorships: Mentorship[];

  @HasMany(() => MentorshipRequest)
  mentorshipRequests: MentorshipRequest[];
}
