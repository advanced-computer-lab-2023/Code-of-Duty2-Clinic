import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isMobileNumber from 'validator/lib/isMobilePhone';
import { IPatient } from './interfaces/IPatient';

export interface IPatientModel extends IPatient, Document {} 

export const PatientSchema = new Schema<IPatientModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  email:{type:String, validate: [ isEmail, 'invalid email' ], unique: true},
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true, validate: [isMobileNumber, 'invalid mobile number'] },
  emergencyContact: {
    fullname: { type: String, required: true },
    mobileNumber: { type: String, required: true, validate: [isMobileNumber, 'invalid mobile number'] },
    relationToPatient: { type: String, required: true },
  },

  deliveryAddresses: Array<{ type: String }>,

  healthRecords: Array<{ type: String }>,
  subscribedPackage: 
  {
    type:{
      packageId: {type: Schema.Types.ObjectId, ref: 'HealthPackage', required: true},
      startDate: {type: Date, required: true},
      endDate: {type: Date, required: true},
      status: {type: String, enum:['subscribed', 'unsubscribed', 'cancelled'], required:true}, 
    },
    required: false,
  },
  dependentFamilyMembers: {
    type:[{
      name: {type: String, required: true}, 
      nationalId: {type: String, required: true, unique : true}, 
      birthdate: {type: Date, required: true},
      gender: {type: String, enum: ['male', 'female'], required: true}, 
      relation: {type: String, enum: ['wife', 'husband', 'children'], required: true}, 
      subscribedPackage: { 
        type: {
          packageId: {type: Schema.Types.ObjectId, ref: 'HealthPackage', required: true},
          startDate: {type: Date, required: true},
          endDate: {type: Date, required: true},
          status: {type: ['subscribed', 'unsubscribed', 'cancelled'], required: true}
        },
        required: false 
      }
    }],
    required: false
  },
  registeredFamilyMembers: {
    type: [
      {
        id: {type: Schema.Types.ObjectId, ref:'Patient', required: true, unique: true},
        relation: {type: String, enum:['wife', 'husband', 'children'], required: true}
      }
    ],
    required: false,
  },
  wallet: {amount: Number},
}, 
{timestamps: true}
);

PatientSchema.virtual('age').get(function() {
  let today = new Date();
  let birthDate: Date = this.dateOfBirth;
  let age = today.getFullYear() - birthDate.getFullYear();
  let monthDifference = today.getMonth() - birthDate.getMonth();
  
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

export default mongoose.model<IPatientModel>('Patient', PatientSchema);