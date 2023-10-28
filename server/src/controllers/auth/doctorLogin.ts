import { Request, Response } from "express";
import Doctor, { IDoctorModel } from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../configurations/config";
import { ROLE } from "../../utils/userRoles";
import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { findDoctorByEmail } from "../../services/doctors";


export const doctorLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(! email || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
    }
    try {
        const user = await findDoctorByEmail(email);
        if (!user) {
            throw new Error(emailOrPasswordIncorrectErrorMessage);
        }
        const isPasswordCorrect = await user.verifyPassword(password);
        if (!isPasswordCorrect) {
            throw new Error(emailOrPasswordIncorrectErrorMessage);
        }
        const accessToken = jwt.sign({ userId: user._id, role: ROLE.DOCTOR }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });
        const refreshToken = jwt.sign({ userId: user._id, role: ROLE.DOCTOR }, config.server.auth.refreshTokenSecret, { expiresIn: config.server.auth.refreshTokenExpirationTime });
        return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
    }
    catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}
