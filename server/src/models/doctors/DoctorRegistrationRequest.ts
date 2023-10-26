import mongoose, { Document, Schema } from 'mongoose';
import isMobileNumber from 'validator/lib/isMobilePhone'
import { IDoctorBaseInfo } from './interfaces/IDoctorBaseInfo';
import isEmail from 'validator/lib/isEmail';

export interface IDoctorRegistrationRequestModel extends IDoctorBaseInfo, Document {} 

export const DoctorRegistrationRequestSchema = new Schema<IDoctorRegistrationRequestModel>({
    email: { type: String, required: true, unique: true, validate: [isEmail, 'invalid email'] },
    username: { type: String, required: true, unique: true },
    password: {type: String, required: true, select: false },
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    mobileNumber: { type: String, required: true, validate: [isMobileNumber, 'invalid mobile number'] },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    status: { type: String, enum: ['accepted', 'pending', 'rejected'], default: 'pending', required: true },
    speciality: { type: String, required: true },
}, 
{timestamps: true}
);


export default mongoose.model<IDoctorRegistrationRequestModel>('DoctorRegistrationRequest', DoctorRegistrationRequestSchema);