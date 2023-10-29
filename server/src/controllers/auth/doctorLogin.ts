import { Request, Response } from "express";
import Doctor from "../../models/doctors/Doctor";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../../configurations/config";
import { ROLE } from "../../utils/userRoles";
import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";


export const doctorLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(! email || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
    }
    try {
        const user = await getDoctor(email, password);
        const accessToken = jwt.sign({ userId: user._id, role: ROLE.DOCTOR }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });
        const refreshToken = jwt.sign({ userId: user._id, role: ROLE.DOCTOR }, config.server.auth.refreshTokenSecret, { expiresIn: config.server.auth.refreshTokenExpirationTime });
        return res.status(StatusCodes.OK).json({ accessToken, refreshToken });
    }
    catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}

const getDoctor = async (email: string, password: string) => {
    const user = await Doctor.findOne({ email }).select({ _id: 1, password: 1 }).lean();
    if (!user) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    return user;
}