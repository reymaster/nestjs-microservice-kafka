import { Document } from 'mongoose';

export interface Notification extends Document {
  userId: string;
  type: 'email' | 'sms';
  response: any;
  status: 'SUCCESS' | 'ERROR';
}
