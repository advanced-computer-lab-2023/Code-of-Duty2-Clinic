import { Request, Response } from 'express';
import Patient from '../../models/patients/Patient';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export const updatePatientPassword = async (req: Request, res: Response) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    // if (!email || !oldPassword || !newPassword || !confirmPassword) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({ message: 'All fields are required' });
    // }


    const patient = await Patient.findOne({ email });

    if (!patient) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Patient not found' });
    }


    const isOldPasswordValid = await bcrypt.compare(oldPassword, patient.password);

    if (!isOldPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Invalid old password' });
    }


    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Password must be strong (min 8 characters, uppercase, lowercase, number, special character)' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "New password and confirmation password don't match" });
    }

    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);


    patient.password = hashedNewPassword;
    await patient.save();

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while updating the password' });
  }
};
