import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'
import { IDoctorBaseInfo } from './IDoctorBaseInfo';

export interface IDoctor extends IDoctorBaseInfo{
  speciality?: string,
  availability?: Date,
  doctor_id?: string,
  medicalLicense?: Buffer,
  medicalDegree?: Buffer,
  wallet?: {
    amount: number
  },
  contract?: Buffer,
  contractStatus?: 'pending' | 'accepted' | 'rejected'
}

export interface IDoctorModel extends IDoctor, Document {} 

export const DoctorSchema = new Schema<IDoctorModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:{type:String,validate: [ isEmail, 'invalid email' ],unique:true},
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  hourlyRate: {type: Number, required: true},
  affiliation: {type: String, required: true},
  educationalBackground: {type: String, required: true},
  speciality: String,
  availability: Date,
  doctor_id: String,
  medicalLicense: Buffer,
  medicalDegree: Buffer,
  wallet: {amount: Number},
  contract: Buffer,
  contractStatus: {type: String, enum: ['pending', 'accepted', 'rejected'], required: true}
}, 
{timestamps: true}
);


export default mongoose.model<IDoctorModel>('Doctor', DoctorSchema);