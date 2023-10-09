import mongoose,{Document, Schema} from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { INotification } from './INotification'

export interface INotificationModel extends INotification , Document{}

export const NotificationSchema = new Schema<INotificationModel>({   
   email:{type:String, validate: [ isEmail, 'invalid email' ], unique:true, required: true},
   title:{type:String, required:true},
   description:{type:String, required:true},
   dateTime: {type:Date, required:true},
   methods:[{type:String, enum:['SMS','email'], required: true}]
})

export default mongoose.model<INotificationModel>('Notification')