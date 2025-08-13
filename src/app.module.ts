import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

const url = process.env.MONGO_URL || 'mongodb://localhost/nest';

@Module({
  imports: [MongooseModule.forRoot(url), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
