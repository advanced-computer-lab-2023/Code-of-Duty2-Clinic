import mongoose,{Document, Schema} from 'mongoose'
import isEmail from 'validator/lib/isEmail'
import { IClinicNotification } from './IClinicNotification'

export interface IClinicNotificationModel extends IClinicNotification , Document{}

export const NotificationSchema = new Schema<IClinicNotificationModel>({   
   email:{type:String, validate: [ isEmail, 'invalid email' ], unique:true},
   title:{type:String, required:true},
   description:{type:String, required:true},
   dateTime: {type:Date, required:true},
   methods:[{type:String, enum:['SMS','email']}]
})

export default mongoose.model<IClinicNotificationModel>('ClinicNotification')