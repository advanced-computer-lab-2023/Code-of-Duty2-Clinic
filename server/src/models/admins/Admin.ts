import mongoose, { Document, Schema } from 'mongoose';
import { IAdmin } from './interfaces/IAdmin';
import bcrypt from 'bcrypt'
import PasswordResetSchema from '../users/PasswordReset';

export interface IAdminModel extends IAdmin, Document {} 

export const AdminSchema = new Schema<IAdminModel>({
  username: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true, select: false, bcrypt: true },
  passwordReset: {
    type: PasswordResetSchema,
    select: false 
  }
}, 
{timestamps: true}
);

AdminSchema.plugin(require('mongoose-bcrypt'), { rounds: 10 });

AdminSchema.methods.verifyPasswordResetOtp = function(otp: string) {
  return bcrypt.compare(otp, this.passwordReset.otp);
}

export default mongoose.model<IAdminModel>('Admin', AdminSchema);