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
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email is required" });
  try {
    const userData = await sendPasswordResetOTPIfUserExists(email);
    console.log(userData);
    res.status(StatusCodes.OK).json(userData);
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
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Email is required" });
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
  const { userData, otp } = req.body;
  if (!userData || !otp)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "UserData and OTP are required" });
  try {
    const user = await validateOTP(userData, otp);
    const passwordResetToken = signAndGetPasswordResetToken({
      id: user._id,
      role: userData.role,
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
  const { password, confirmPassword } = req.body;
  if (!password || !confirmPassword)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Both Password and Confirm password is required" });
  if (password !== confirmPassword)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Password and Confirm password must be same" });
  try {
    const { passwordResetToken } = req.cookies;
    if (!passwordResetToken) throw new Error("Password reset token not found");
    const userData = verifyAndDecodePasswordResetToken(passwordResetToken);
    await updatePassword(userData, password);
    res.clearCookie("passwordResetToken", { httpOnly: true });
    res.status(StatusCodes.OK).json({ message: "Password reset successfully" });
  } catch (error: any) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
};
