import { Schema } from "mongoose";
import { INotification } from "./interfaces/INotification";

const NotificationSchema = new Schema<INotification>({
  subject: { type: String, required: true },
  description: { type: String, required: true },
  time: { type: Date, required: true },
  isRead: { type: Boolean, default: false },
});

export default NotificationSchema;
