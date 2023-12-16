export interface INotification {
  _id?: string;
  subject: string;
  description: string;
  time: Date;
  isRead: boolean;
}
