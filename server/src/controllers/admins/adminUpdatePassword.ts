// In admins/controllers/updatePasswordById.ts
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAdminById, updatePasswordById, validateAdminPassword } from '../../services/admins';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
import bcrypt from 'bcrypt';

export const updateAdminPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const adminId = req.user?.id!;
    
    const admin = await findAdminById(adminId);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin not found' });
    }

    const isPasswordCorrect = await validateAdminPassword(admin, currentPassword);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Current password is incorrect' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New password and confirm password do not match' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    admin.password = hashedPassword;

    await updatePasswordById(adminId, hashedPassword);

    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};
