import mongoose, { Document, Schema } from "mongoose";
import isMobileNumber from "validator/lib/isMobilePhone";
import { IDoctorBaseInfo } from "./interfaces/IDoctorBaseInfo";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

export interface IDoctorRegistrationRequestModel
  extends IDoctorBaseInfo,
    Document {
  identificationUrl?: string;
  medicalLicenseUrl?: string;
  medicalDegreeUrl?: string;
  contractUrl?: string;
  status:
    | "accepted"
    | "pending documents upload"
    | "pending contract acceptance"
    | "rejected";
  verifyPassword?: (password: string) => Promise<boolean>;
}

export const DoctorRegistrationRequestSchema =
  new Schema<IDoctorRegistrationRequestModel>(
    {
      email: {
        type: String,
        required: true,
        unique: true,
        validate: [isEmail, "invalid email"],
      },
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true, select: false },
      name: { type: String, required: true },
      gender: { type: String, required: true, enum: ["male", "female"] },
      mobileNumber: {
        type: String,
        required: true,
        validate: [isMobileNumber, "invalid mobile number"],
      },
      dateOfBirth: { type: Date, required: true },
      hourlyRate: { type: Number, required: true },
      affiliation: { type: String, required: true },
      educationalBackground: { type: String, required: true },
      status: {
        type: String,
        enum: [
          "accepted",
          "pending documents upload",
          "pending contract acceptance",
          "rejected",
        ],
        default: "pending documents upload",
        required: true,
      },
      speciality: { type: String, required: true },
      identificationUrl: { type: String, select: false },
      medicalLicenseUrl: { type: String, select: false },
      medicalDegreeUrl: { type: String, select: false },
      contractUrl: { type: String, select: false },
    },
    { timestamps: true }
  );

DoctorRegistrationRequestSchema.pre("save", function (next) {
  var user = this;
  if (!user.isModified("password")) return next();
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

DoctorRegistrationRequestSchema.methods.verifyPassword = function (
  password: string
) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IDoctorRegistrationRequestModel>(
  "DoctorRegistrationRequest",
  DoctorRegistrationRequestSchema
);
