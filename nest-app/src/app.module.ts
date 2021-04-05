import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { NotificationController } from './notification/notification.controller';

@Module({
  imports: [UserModule],
  controllers: [AppController, NotificationController],
  providers: [],
})
export class AppModule {}
