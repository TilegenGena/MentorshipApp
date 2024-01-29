import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/modules/user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/modules/user/user.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { SessionSerializer } from './session.serializer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    PassportModule.register({ session: true }),
    ConfigModule.forRoot({
      expandVariables: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy, SessionSerializer],
})
export class AuthModule {}
