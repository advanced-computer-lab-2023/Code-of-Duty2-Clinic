import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'

export const DoctorSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref:'User', required: true, unique: true},
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
  identification: Buffer,
  medicalLicense: Buffer,
  medicalDegree: Buffer,
  wallet: {amount: Number},
  contract: Buffer,
  contractStatus: {type: String, enum: ['pending', 'accepted', 'rejected'], required: true}
}, 
{timestamps: true}
);


export default mongoose.model('Doctor', DoctorSchema);