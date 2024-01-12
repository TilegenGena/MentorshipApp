import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import 'dotenv/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { parse } from 'pg-connection-string';

const url = process.env.DATABASE_URL!;
const connectionOptions = parse(url);
const hostOptions = connectionOptions.host!;
const db = connectionOptions.database!;

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: hostOptions,
      port: parseInt(connectionOptions.port || '5432'),
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: db,
      autoLoadModels: true,
      synchronize: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist/client'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
