import mongoose, { Document, Schema } from "mongoose";
import isEmail from "validator/lib/isEmail";
import { IDoctor } from "./interfaces/IDoctor";
import bcrypt from "bcrypt";
import WalletSchema, { DotctorWalletSchema } from "../wallets/Wallet";
import PasswordResetSchema from "../users/PasswordReset";

export interface IDoctorModel extends IDoctor, Document {}

export const DoctorSchema = new Schema<IDoctorModel>(
  {
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true, select: false },
    email: {
      type: String,
      validate: [isEmail, "invalid email"],
      unique: true,
      index: true,
    },
    name: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    mobileNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    hourlyRate: { type: Number, required: true },
    affiliation: { type: String, required: true },
    educationalBackground: { type: String, required: true },
    speciality: { type: String, required: true },
    availableSlots: {
      type: [{ startTime: Date, endTime: Date }],
      default: [],
      select: false,
    },
    imageUrl: String,
    identificationUrl: { type: String, select: false },
    medicalLicenseUrl: { type: String, select: false },
    medicalDegreeUrl: { type: String, select: false },
    contractUrl: { type: String, select: false },
    contractStatus: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      required: true,
      default: "accepted",
      select: false,
    },
    wallet: {
      type: DotctorWalletSchema,
      select: false,
      required: false,
    },
    passwordReset: {
      type: PasswordResetSchema,
      select: false,
    },
  },
  { timestamps: true }
);

DoctorSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("wallet")) return next();
  bcrypt.hash(user.wallet!.pinCode, 10, function (err, hash) {
    if (err) return next(err);
    user.wallet!.pinCode = hash;
    next();
  });
});

DoctorSchema.methods.verifyPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

DoctorSchema.methods.verifyPasswordResetOtp = function (otp: string) {
  console.log(otp, this.passwordReset.otp);
  console.log(bcrypt.compare(otp, this.passwordReset.otp));
  return bcrypt.compare(otp, this.passwordReset.otp);
};
DoctorSchema.methods.verifyWalletPinCode = function (pinCode: string) {
  return bcrypt.compare(pinCode, this.wallet.pinCode);
};

export default mongoose.model<IDoctorModel>("Doctor", DoctorSchema);
``;
