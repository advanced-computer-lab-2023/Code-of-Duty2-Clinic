import { Request, Response } from "express";
import Admin, { IAdminModel } from "../../models/admins/Admin";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import Patient, { IPatientModel } from "../../models/patients/Patient";
import jwt from 'jsonwebtoken';
import config from "../../configurations/config";
import { ROLE } from "../../utils/userRoles";
import { emailOrPasswordIncorrectErrorMessage } from "../../utils/ErrorMessages";
import { findAdminByUsername } from "../../services/admins";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(! email || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
    }

    try {
        let user: IAdminModel | IPatientModel | null;
        
        user = await findAdminByUsername(email);
        if(user) {
            const isPasswordCorrect = await user.verifyPassword(password);
            const accessToken = jwt.sign({ userId: user._id, role: ROLE.ADMIN }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });
            const refreshToken = jwt.sign({ userId: user._id, role: ROLE.ADMIN }, config.server.auth.refreshTokenSecret, { expiresIn: config.server.auth.refreshTokenExpirationTime });
            return res.status(StatusCodes.OK).json({ accessToken, refreshToken });   
        }
        user = await getPatient(email, password);
        if(! user) {
            throw new Error(emailOrPasswordIncorrectErrorMessage);
        }
        const accessToken = jwt.sign({ userId: user._id, role: ROLE.PATIENT }, config.server.auth.accessTokenSecret, { expiresIn: config.server.auth.accessTokenExpirationTime });
        const refreshToken = jwt.sign({ userId: user._id, role: ROLE.PATIENT }, config.server.auth.refreshTokenSecret, { expiresIn: config.server.auth.refreshTokenExpirationTime });
        return res.status(StatusCodes.OK).json({ accessToken, refreshToken });   
    } catch(error: any) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}

const getAdmin = async (email: string, password: string) => {
    const user = await Admin.findOne({ email }).select({ _id: 1, password: 1 }).lean();
    if(! user) {
        return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(! isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    return user;
}

const getPatient = async (email: string, password: string) => {
    const user = await Patient.findOne({ email }).select({ _id: 1, password: 1 }).lean(); 
    if(! user) {
        return null;
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(! isPasswordCorrect) {
        throw new Error(emailOrPasswordIncorrectErrorMessage);
    }
    return user;   
}
