import mongoose, { Document, Schema } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import isMobileNumber from 'validator/lib/isMobilePhone';
import { IPatient } from './interfaces/IPatient';
import PasswordResetSchema from '../users/PasswordReset';
import WalletSchema from '../wallets/Wallet';
import bcrypt from 'bcrypt';

export interface IPatientModel extends IPatient, Document {} 

export const PatientSchema = new Schema<IPatientModel>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false, bcrypt: true },
  email:{ type: String, validate: [ isEmail, 'invalid email' ], unique: true, index: true },
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true, enum: ['male', 'female'] },
  mobileNumber: { type: String, required: true },
  emergencyContact: {
    fullname: { type: String, required: true },
    mobileNumber: { type: String, required: true, validate: [isMobileNumber, 'invalid mobile number'] },
    relationToPatient: { type: String, required: true },
  },
 
  deliveryAddresses: { type: Array<{ type: String }>, select: false },
  imageUrl: String,
  healthRecords: {
    type:Array<{type:{ 
      name: {type: String, required: true},
      url: {type: String, required: true},
      recordType:{type:String,required:true},
      fileType:{type:String,required:true},
      createdAt: {type: Date,immutable: true}
    }}>,
    required: false
  },
  subscribedPackage: 
  {
    type:{
      packageId: {type: Schema.Types.ObjectId, ref: 'HealthPackage', required: true},
      startDate: {type: Date, required: true},
      endDate: {type: Date, required: true},
      status: {type: String, enum:['subscribed', 'unsubscribed', 'cancelled'], required: true}, 
    },
    required: false,
    select: false,
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
    required: false,
    select: false,
  },
  registeredFamilyMembers: {
    type: [
      {
        id: {type: Schema.Types.ObjectId, ref:'Patient', required: true, unique: true},
        relation: {type: String, enum:['wife', 'husband', 'children'], required: true}
      }
    ],
    required: false,
    select: false,
  },
  wallet: {
    type: { WalletSchema },
    select: false,
  },
  passwordReset: {
    type: PasswordResetSchema,
    select: false 
  }
}, 
{timestamps: true}
);

PatientSchema.plugin(require('mongoose-bcrypt'), { rounds: 10 });

PatientSchema.methods.verifyPasswordResetOtp = function(otp: string) {
  return bcrypt.compare(otp, this.passwordReset.otp);
}
PatientSchema.methods.verifyWalletPinCode = function(pinCode: string) {
  return bcrypt.compare(pinCode, this.wallet.pinCode);
}


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