import { SendGridService } from '@anchan828/nest-sendgrid';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Client, TextContent, IMessage } from '@zenvia/sdk';
import { Model } from 'mongoose';
import { NotificationDto } from './dtos/notification.dto';
import { Notification } from './interfaces/notification.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModule: Model<Notification>,
    private readonly sendGrid: SendGridService,
  ) {}

  private client = new Client(process.env.ZENVIA_TOKEN);

  async sendEmail(userId: string, email: string, name: string): Promise<void> {
    await this.sendGrid
      .send({
        to: `${name} <${email}>`,
        from: process.env.FROM_EMAIL,
        subject: 'User created',
        text: `Hello ${name}, your user was created successfully!`,
        html: `<strong>Hello ${name}</strong>, your user was created successfully!`,
      })
      .then(async (response) => {
        await this.createMongoNotification(
          userId,
          'email',
          response,
          'SUCCESS',
        );
      })
      .catch(async (error) => {
        await this.createMongoNotification(userId, 'email', error, 'ERROR');
      });
  }

  async sendSMS(userId: string, phone: string, name: string): Promise<void> {
    const sms = this.client.getChannel('sms');
    const content = new TextContent(
      `Hello ${name}, your user was created successfully!`,
    );

    await sms
      .sendMessage(process.env.ZENVIA_KEYWORD, phone, content)
      .then(
        async ({
          channel,
          contents,
          from,
          to,
          direction,
          id: messageId,
        }: IMessage) => {
          const response: any = {
            channel,
            contents,
            from,
            to,
            direction,
            messageId,
          };

          await this.createMongoNotification(
            userId,
            'sms',
            response,
            'SUCCESS',
          );
        },
      )
      .catch(async (error) => {
        await this.createMongoNotification(userId, 'sms', error, 'ERROR');
      });
  }

  private async createMongoNotification(
    userId: string,
    type: 'sms' | 'email',
    response: any,
    status: 'SUCCESS' | 'ERROR',
  ): Promise<void> {
    const notification: NotificationDto = {
      userId,
      type,
      response,
      status,
    };

    const createNotification = new this.notificationModule(notification);

    await createNotification.save();
  }
}
