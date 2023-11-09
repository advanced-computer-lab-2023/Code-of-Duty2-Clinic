import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findDoctorById, updatePasswordById } from '../../services/doctors';
import { AuthorizedRequest } from '../../types/AuthorizedRequest';
// import bcrypt from 'bcrypt'; 


export const updateDoctorPassword = async (req: AuthorizedRequest, res: Response) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const doctorId = req.user?.id!;
        
        const doctor = await findDoctorById(doctorId);
        
        if (!doctor) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
        }
        
        const isPasswordCorrect = await doctor.verfiyPassword?.(currentPassword);
        
        if (!isPasswordCorrect) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Current password is incorrect' });
        }
        
        if (newPassword !== confirmPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New password and confirm password do not match' });
        }
        

        
        await updatePasswordById(doctorId, newPassword);

    return res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' });

  } catch (error) {

    console.error(error);

    res.status(StatusCodes.BAD_REQUEST).json({ message: 'An error occurred while updating the password' });
  }
};
