import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'
import { IDoctor } from './interfaces/IDoctor';
import bcrypt from 'mongoose-bcrypt'

export interface IDoctorModel extends IDoctor, Document {} 

export const DoctorSchema = new Schema<IDoctorModel>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false, bcrypt: true },
  email:{ type: String, validate: [ isEmail, 'invalid email' ], unique: true, index: true },
  name: { type: String, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  hourlyRate: {type: Number, required: true},
  affiliation: {type: String, required: true},
  educationalBackground: {type: String, required: true},
  speciality: {type: String, required: true},
  availableSlots: [
    {startTime: Date, endTime: Date}
  ],
  imageUrl: String,
  identificationUrl: String,
  medicalLicenseUrl: String,
  medicalDegreeUrl: String,
  wallet: {
    type: {
      amount: Number,
      currency: { type: String, default: 'EGP' },
      pinCode: { type: String, bcrypt: true },
    },
    select: false,  
  },
  contractUrl: String,
  contractStatus: { type: String, enum: ['pending', 'accepted', 'rejected'], required: true, default: 'accepted', select: false },
}, 
{timestamps: true}
);


DoctorSchema.plugin(bcrypt);


export default mongoose.model<IDoctorModel>('Doctor', DoctorSchema);