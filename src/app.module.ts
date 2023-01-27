import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ConfigModule.forRoot({
    isGlobal: true,
  }),
    MongooseModule.forRoot(`mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASS}@cluster0.itt8nbc.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`),
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
