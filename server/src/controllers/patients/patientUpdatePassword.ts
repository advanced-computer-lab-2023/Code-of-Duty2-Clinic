import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findPatientById, updatePasswordById, validatePatientPassword } from '../../services/patients';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import bcrypt from 'bcrypt';

export const updatePatientPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const patientId = req.user?.id!;

    const patient = await findPatientById(patientId);

    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient not found' });
    }

    const isPasswordCorrect = await validatePatientPassword(patient, currentPassword);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New password and confirm password do not match' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    patient.password = hashedPassword;

    await updatePasswordById(patientId, hashedPassword);

    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {

    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};
