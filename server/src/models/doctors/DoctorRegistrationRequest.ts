import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { IDoctorBaseInfo } from './IDoctorBaseInfo';

export interface IDoctorRegistrationRequestModel extends IDoctorBaseInfo, Document {} 

export const DoctorRegistrationRequestSchema = new Schema<IDoctorRegistrationRequestModel>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email:{type:String, validate: [ isEmail, 'invalid email' ],unique:true},
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: {type: Number, required: true},
    affiliation: {type: String, required: true},
    educationalBackground: {type: String, required: true},
}, 
{timestamps: true}
);


export default mongoose.model<IDoctorRegistrationRequestModel>('DoctorRegistrationRequest', DoctorRegistrationRequestSchema);