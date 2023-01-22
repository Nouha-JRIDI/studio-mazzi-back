import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import {ConfigModule} from '@nestjs/config'

@Module({
  imports: [ ConfigModule.forRoot({
    ignoreEnvFile: true,
    isGlobal: true,
  }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASS}@cluster0.itt8nbc.mongodb.net/studiomazziDb?retryWrites=true&w=majority`),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
