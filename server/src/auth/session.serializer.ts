import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/modules/user/user.model';
import { UserService } from 'src/modules/user/user.service';

type SerializedPayloadType = {
  userId: number;
};

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error | null, payload: SerializedPayloadType | null) => void,
  ): void {
    const serielizedUser: SerializedPayloadType = {
      userId: user.id,
    };
    done(null, serielizedUser);
  }

  async deserializeUser(
    payload: SerializedPayloadType,
    done: (err: Error | null, user: User | null) => void,
  ): Promise<void> {
    try {
      const user = await this.userService.getUserById(payload.userId);
      if (user) {
        done(null, user);
      } else {
        throw new UnauthorizedException();
      }
    } catch (err) {
      done(err, null);
    }
  }
}
