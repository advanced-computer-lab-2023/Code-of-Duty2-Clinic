import { Schema } from "mongoose";
import { IPasswordResetInfo } from "./interfaces/IPasswordReset";
import bcrypt from 'mongoose-bcrypt';

const PasswordResetSchema = new Schema<IPasswordResetInfo>({
    otp: { type: String, required: true, bcrypt: true },
    expiryDate: { type: Date, required: true }
});
PasswordResetSchema.plugin(bcrypt, { rounds: 10 });

export default PasswordResetSchema;