import { Request, Response } from 'express';
import Admin from '../../models/admins/Admin';
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';

export const updateAdminPassword = async (req: Request, res: Response) => {
  try {
    const { username, oldPassword, newPassword, confirmPassword } = req.body;

    const admin = await Admin.findOne({ username });

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin not found' });
    }


    const isOldPasswordValid = await bcrypt.compare(oldPassword, admin.password);

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


    admin.password = hashedNewPassword;
    await admin.save();

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while updating the password' });
  }
};
