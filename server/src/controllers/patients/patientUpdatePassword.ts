import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findPatientById, updatePasswordById } from "../../services/patients";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";

export const updatePatientPassword = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const patientId = req.user?.id!;

    const patient = await findPatientById(patientId);

    if (!patient) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Patient not found" });
    }

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message:
            "Current password, new password and confirm password are required",
        });
    }

    const isPasswordCorrect = await patient.verifyPassword?.(currentPassword);

    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
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

    await updatePasswordById(patientId, newPassword);

    return res
      .status(StatusCodes.OK)
      .json({ message: "Password updated successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "An error occurred while updating the password" });
  }
};
