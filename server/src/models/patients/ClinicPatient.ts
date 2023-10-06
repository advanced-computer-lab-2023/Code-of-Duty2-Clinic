import { IUserBaseInfo } from 'models/IUserBaseInfo';
import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail'

export interface IClinicPatient extends IUserBaseInfo{
  emergencyContact: {
    fullname: string,
    mobileNumber: string,
    relationToPatient: string,
  },
  deliveryAddresses: string[],
  healthRecords?: Buffer[], 
  subscribedPackages?: [
    {
      packageId: Schema.Types.ObjectId,
      startDate: Date,
      endDate: Date,
      status: 'subscribed' | 'unsubscribed' | 'cancelled', 
    }
  ],
  dependentFamilyMembers?: [ 
    {
      name: string, 
      nationalId: string, 
      age: number,
      gender: string, 
      relation: 'wife' | 'husband' | 'children', 
      subscribedPackages: [ 
        {
          packageId: Schema.Types.ObjectId,
          startDate: Date,
          endDate: Date, 
          status: 'subscribed' | 'unsubscribed' | 'cancelled' 
        } 
      ]
    }
 ]
  registeredFamilyMembers?: [
    {
      id: Schema.Types.ObjectId,
      relation:  'wife' | 'husband' | 'children'
    }
  ],
}

export interface IClinicPatientModel extends IClinicPatient, Document {} 

export const ClinicPatientSchema = new Schema<IClinicPatientModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email:{type:String,validate: [ isEmail, 'invalid email' ],unique:true},
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true },
  emergencyContact: {
    fullname: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    relationToPatient: { type: String, required: true },
  },

  deliveryAddresses: {type: [{ type: String }], required: true},

  healthRecords: [{ type: Buffer }],
  subscribedPackages: [
    {
      packageId: {type: Schema.Types.ObjectId, ref: 'HealthPackage', required: true},
      startDate: {type: Date, required: true},
      endDate: {type: Date, required: true},
      status: {type: String, enum:['subscribed', 'unsubscribed', 'cancelled'], required:true}, 
    }
  ],
  dependentFamilyMembers: [ 
    {
      name: {type: String, required: true}, 
      nationalId: {type: String, required: true}, 
      age: {type: Number, required: true},
      gender: {type: String, enum: ['male', 'female'], required: true}, 
      relation: {type: String, enum: ['wife', 'husband', 'children'], required: true}, 
      subscribedPackages: [ 
        {
          packageId: {type: Schema.Types.ObjectId, required: true},
          startDate: {type: Date, required: true},
          endDate: {type: Date, required: true},
          status: {type: ['subscribed', 'unsubscribed', 'cancelled'], required: true}
        } 
      ]
    }
  ],
  registeredFamilyMembers: [
    {
      id: {type: Schema.Types.ObjectId, ref:'ClinicPatient', required: true},
      relation: {type: String, enum:['wife', 'husband', 'children'], required: true}
    }
  ]
}, 
{timestamps: true}
);


export default mongoose.model<IClinicPatientModel>('ClinicPatient', ClinicPatientSchema);