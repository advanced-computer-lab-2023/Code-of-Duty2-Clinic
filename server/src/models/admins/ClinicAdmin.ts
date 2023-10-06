import mongoose, { Document, Schema } from 'mongoose';
import { IClinicAdmin } from './IClinicAdmin';

export interface IClinicAdminModel extends IClinicAdmin, Document {} 

export const ClinicAdminSchema = new Schema<IClinicAdminModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, 
{timestamps: true}
);


export default mongoose.model<IClinicAdminModel>('ClinicAdmin', ClinicAdminSchema);