import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'
import { IDoctor } from './interfaces/IDoctor';
import isMobileNumber from 'validator/lib/isMobilePhone'

export interface IDoctorModel extends IDoctor, Document {} 

export const DoctorSchema = new Schema<IDoctorModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email:{type:String,validate: [ isEmail, 'invalid email' ], unique: true},
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true, validate: [isMobileNumber, 'invalid mobile number'] },
  dateOfBirth: { type: Date, required: true },
  hourlyRate: {type: Number, required: true},
  affiliation: {type: String, required: true},
  educationalBackground: {type: String, required: true},
  speciality: {type: String, required: true},
  availableSlots: [
    {startTime: Date, endTime: Date}
  ],
  identification: Buffer,
  medicalLicense: Buffer,
  medicalDegree: Buffer,
  wallet: {amount: Number},
  contract: Buffer,
  contractStatus: {type: String, enum: ['pending', 'accepted', 'rejected'], required: true}
}, 
{timestamps: true}
);


export default mongoose.model<IDoctorModel>('Doctor', DoctorSchema);