import mongoose, { Document, Schema } from 'mongoose';
import { IAdmin } from './interfaces/IAdmin';
import bcrypt from 'mongoose-bcrypt'

export interface IAdminModel extends IAdmin, Document {} 

export const AdminSchema = new Schema<IAdminModel>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false, bcrypt: true },
}, 
{timestamps: true}
);

AdminSchema.plugin(bcrypt);

export default mongoose.model<IAdminModel>('Admin', AdminSchema);