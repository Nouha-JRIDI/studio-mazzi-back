import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientSchema } from './client/schema/client.schema';
import { ClientService } from './client/client.service';
import { ClientController } from './client/client.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASS}@cluster0.itt8nbc.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`,
    ),
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]),
  ],
  controllers: [AppController, ClientController],
  providers: [AppService, ClientService],
})
export class AppModule {}
