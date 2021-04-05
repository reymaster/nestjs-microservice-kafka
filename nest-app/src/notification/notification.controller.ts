import { Body, Controller, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';
import { EmailDto } from './dto/email.dto';
import { SMSDto } from './dto/sms.dto';

@Controller('notifications')
export class NotificationController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
    },
  })
  private client: ClientKafka;

  @Post('email')
  sendEmail(@Body() data: EmailDto) {
    return this.client.emit('notification_email', data);
  }

  @Post('sms')
  sendSMS(@Body() data: SMSDto) {
    return this.client.emit('notification_sms', data);
  }
}
