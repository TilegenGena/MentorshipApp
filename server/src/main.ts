import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET')!,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.authenticate('session'));
  await app.listen(3000);
}
bootstrap();
