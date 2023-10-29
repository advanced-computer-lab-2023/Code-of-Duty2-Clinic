import mongoose, { Document, Schema } from 'mongoose';
import { IAdmin } from './interfaces/IAdmin';

export interface IAdminModel extends IAdmin, Document {} 

export const AdminSchema = new Schema<IAdminModel>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, 
{timestamps: true}
);


export default mongoose.model<IAdminModel>('Admin', AdminSchema);