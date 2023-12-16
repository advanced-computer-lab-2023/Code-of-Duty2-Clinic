import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findDoctorById } from "../../services/doctors";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const updateDoctorPassword = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const doctorId = req.user?.id!;

    const doctor = await findDoctorById(doctorId, "+password");

    if (!doctor) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Doctor not found" });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Current password, new password and confirm password are required",
      });
    }

    const isPasswordCorrect = await doctor.verifyPassword?.(currentPassword);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Current password is incorrect" });
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Password must be strong (min 8 characters, uppercase, lowercase, number, special character)",
      });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "New password and confirm password do not match" });
    }

    await doctor.storePassword?.(newPassword);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully!" });
  } catch (error: any) {
    console.error(error);

    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message || "Something went wrong" });
  }
};
