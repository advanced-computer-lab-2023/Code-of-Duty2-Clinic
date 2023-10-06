
//Import mongoose and Schema
import mongoose,{Document, Schema} from 'mongoose'


// Define the interface for ClinicNotifiaction
export interface IClinicNotification {
    email: string,
    title:string,
    description:string,
    dateTime:Date,
    methods:[{method:'SMS'|'email'}]
} 

export interface IClinicNotificationModel extends IClinicNotification , Document{}

export const NotificationSchema = new Schema<IClinicNotificationModel>({
   email:{type:String,required:true},
   title:{type:String,required:true},
   description:{type:String,required:true},
   dateTime:{type:Date,required:true},
   methods:[{type:String, enum:['SMS','email']}]

})

export default mongoose.model<IClinicNotificationModel>('ClinicNotification')