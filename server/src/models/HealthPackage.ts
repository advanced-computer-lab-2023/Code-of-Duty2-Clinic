//Import mongoose and Schema
import mongoose, { Document, Schema } from 'mongoose';
 
  
// Define the interface for HealthPackage
export interface IHealthPackage {
  name: string;
  amountToPay: number;
  discount:{
    
    gainedDoctorSessionDiscount: number;
    gainedPharamcyMedicinesDiscount:number;
    gainedFamilyMembersDiscount: number;
  }
  packageDurationInYears: number;
}

export interface IHealthPackageModel extends IHealthPackage, Document {} 

export const HealthPackageSchema = new Schema<IHealthPackageModel>({
  name: { type: String, required: true },
  amountToPay: { type: Number, required: true },
  discount:{
    gainedDoctorSessionDiscount: {type:Number,required: true},
    gainedPharamcyMedicinesDiscount:{type:Number,required: true},
    gainedFamilyMembersDiscount: {type:Number,required: true}
  },
  packageDurationInYears:{type:Number,required:true}
});


export default mongoose.model<IHealthPackageModel>('HealthPackage', HealthPackageSchema);