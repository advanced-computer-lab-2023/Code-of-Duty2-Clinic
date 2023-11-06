import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Doctor from '../../models/doctors/Doctor';
import jwt from 'jsonwebtoken';
import config from '../../configurations/config';
import { StatusCodes } from 'http-status-codes';
import { ROLE } from "../../utils/userRoles";

export const updateDoctorPassword = async (req: Request, res: Response) => {

    const { email, oldPassword, newPassword, newPasswordConfirmation } = req.body;

    if (newPassword !== newPasswordConfirmation) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New passwords do not match' });
    }

    
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Doctor not found' });
    }

    
    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, doctor.password);

    if (!isOldPasswordCorrect) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Old password is incorrect' });
    }

    
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(newPassword)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'New password must be strong (min 8 characters, uppercase, lowercase, number, special character)' });
    }

    
    const saltRounds = 10; // Complexity of a single bcrypt hash
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    doctor.password = hashedNewPassword;

    await doctor.save();

    // New access token with the updated information
    const accessToken = jwt.sign({ userId: doctor._id, role: ROLE.DOCTOR }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });

    res.status(StatusCodes.OK).json({ message: 'Password updated successfully', accessToken });
};
