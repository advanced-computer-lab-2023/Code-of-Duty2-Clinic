import mongoose, { Document, Schema } from 'mongoose';
import isMobileNumber from 'validator/lib/isMobilePhone'
import { IDoctorBaseInfo } from './interfaces/IDoctorBaseInfo';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'mongoose-bcrypt'

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
    experienceFiles:{
        type:[{
            name:{type:String},
            url:{type:String}
        }]
    } 
}, 
{timestamps: true}
);

DoctorRegistrationRequestSchema.plugin(bcrypt, { rounds: 10 });

export default mongoose.model<IDoctorRegistrationRequestModel>('DoctorRegistrationRequest', DoctorRegistrationRequestSchema);