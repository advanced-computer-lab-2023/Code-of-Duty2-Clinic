//Import mongoose and Schema
import mongoose, { Document, Schema } from 'mongoose';
import { IHealthPackage } from './interfaces/IHealthPackage';
 
  
export interface IHealthPackageModel extends IHealthPackage, Document {} 

export const HealthPackageSchema = new Schema<IHealthPackageModel>({
  name: { type: String, required: true, unique: true },
  amountToPay: { type: Number, required: true },
  discounts:{
    gainedDoctorSessionDiscount: {type:Number,required: true},
    gainedPharamcyMedicinesDiscount:{type:Number,required: true},
    gainedFamilyMembersDiscount: {type:Number,required: true}
  },
  packageDurationInYears:{type:Number, required:true}
});


export default mongoose.model<IHealthPackageModel>('HealthPackage', HealthPackageSchema);