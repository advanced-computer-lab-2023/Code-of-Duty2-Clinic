import { Request, Response } from "express";
import {
  deletePasswordResetInfo,
  sendPasswordResetOTPIfUserExists,
  validateOTP,
} from "../../services/auth/reset-password";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail, updatePassword } from "../../services/users";
import {
  signAndGetPasswordResetToken,
  verifyAndDecodePasswordResetToken,
} from "../../utils/jwt";
import { User } from "../../types/User";

export const resetPasswordRequestHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  if (!email)
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Email is required" });
  try {
    const passwordResetInfo = await sendPasswordResetOTPIfUserExists(email);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset OTP sent successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const deletePasswordResetInfoHandler = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  if (!email)
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Email is required" });
  try {
    const user = await findUserByEmail(email);
    await deletePasswordResetInfo(user);
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset info deleted successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const validateOTPHandler = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email and OTP are required" });
  try {
    const user = await validateOTP(email, otp);
    const passwordResetToken = signAndGetPasswordResetToken({
      id: user._id,
      role: user.role,
    } as User);
    res.cookie("passwordResetToken", passwordResetToken, {
      httpOnly: true,
      expires: user.passwordReset?.expiryDate,
    });
    res
      .status(StatusCodes.OK)
      .json({ message: "Password reset OTP is correct" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};

export const resetPasswordHandler = async (req: Request, res: Response) => {
  const { password } = req.body;
  if (!password)
    res.status(StatusCodes.BAD_REQUEST).json({ error: "Password is required" });
  try {
    const { passwordResetToken } = req.cookies;
    if (!passwordResetToken) throw new Error("Password reset token not found");
    const userData = verifyAndDecodePasswordResetToken(passwordResetToken);
    await updatePassword(userData, password);
    res.status(StatusCodes.OK).json({ message: "Password reset successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
