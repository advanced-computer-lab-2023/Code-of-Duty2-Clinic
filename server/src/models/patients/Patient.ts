import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'
import { IPatient } from './IPatient';

export interface IPatientModel extends IPatient, Document {} 

export const PatientSchema = new Schema<IPatientModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:{type:String,validate: [ isEmail, 'invalid email' ], unique: true},
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true },
  emergencyContact: {
    fullname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    relationToPatient: { type: String, required: true },
  },

  deliveryAddresses: Array<{ type: String }>,

  healthRecords: Array<{ type: Buffer }>,
  subscribedPackage: 
  {
    packageId: {type: Schema.Types.ObjectId, ref: 'HealthPackage', required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    status: {type: String, enum:['subscribed', 'unsubscribed', 'cancelled'], required:true}, 
  },
  dependentFamilyMembers: [ 
    {
      name: {type: String, required: true}, 
      nationalId: {type: String, required: true}, 
      age: {type: Number, required: true},
      gender: {type: String, enum: ['male', 'female'], required: true}, 
      relation: {type: String, enum: ['wife', 'husband', 'children'], required: true}, 
      subscribedPackage: { 
        type: {
          packageId: {type: Schema.Types.ObjectId, required: true},
          startDate: {type: Date, required: true},
          endDate: {type: Date, required: true},
          status: {type: ['subscribed', 'unsubscribed', 'cancelled'], required: true}
        },
        required: false 
      }
    }
  ],
  registeredFamilyMembers: [
    {
      id: {type: Schema.Types.ObjectId, ref:'Patient', required: true},
      relation: {type: String, enum:['wife', 'husband', 'children'], required: true}
    }
  ]
}, 
{timestamps: true}
);


export default mongoose.model<IPatientModel>('Patient', PatientSchema);