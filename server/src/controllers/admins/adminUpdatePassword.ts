import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findAdminById, updatePasswordById } from '../../services/admins';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';


export const updateAdminPassword = async (req: AuthorizedRequest, res: Response) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    const adminId = req.user?.id!;
    
    const admin = await findAdminById(adminId);

    if (!admin) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Admin not found' });
    }
    // await admin.verifyPassword(currentPassword, (err: any, isMatch: boolean) => {

    // const isPasswordCorrect = await validateAdminPassword(admin, currentPassword);
    
    const isPasswordCorrect = await admin.verifyPassword?.(currentPassword);

    if (!isPasswordCorrect) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Current password is incorrect' });
    }


    if (newPassword !== confirmPassword) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New password and confirm password do not match' });
    }

    // const saltRounds = 10;
    // const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    // admin.password = hashedPassword;

    await updatePasswordById(adminId, newPassword);

    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {
    console.error(error);
    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};
