export class NotificationDto {
  userId: string;
  type: 'email' | 'sms';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}
