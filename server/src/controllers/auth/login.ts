import { Request, Response } from "express";
import Admin from "../../models/admins/Admin";
import { StatusCodes } from "http-status-codes";
import bcrypt from 'bcrypt';
import Patient from "../../models/patients/Patient";
import jwt from 'jsonwebtoken';
import config from "../../configurations/config";
import { ROLE } from "../../utils/userRoles";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(! email || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
    }

    try {
        let user = await getAdmin(email, password);
        if(user) {
            const accessToken = jwt.sign({ userId: user._id, role: ROLE.ADMIN }, config.server.accessTokenSecret, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ userId: user._id, role: ROLE.ADMIN }, config.server.refreshTokenSecret, { expiresIn: '7d' });
            return res.status(StatusCodes.OK).json({ accessToken, refreshToken });   
        }
        user = await getPatient(email, password);
        const accessToken = jwt.sign({ userId: user._id, role: ROLE.PATIENT }, config.server.accessTokenSecret, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id, role: ROLE.PATIENT }, config.server.refreshTokenSecret, { expiresIn: '7d' });
        return res.status(StatusCodes.OK).json({ accessToken, refreshToken });   
    } catch(error: any) {
        res.status(StatusCodes.BAD_REQUEST).json(error.message);
    }
}

const getAdmin = async (email: string, password: string) => {
    const user = await Admin.findOne({ email }).select({ _id: 1, password: 1 }).lean();
    if(! user) {
        throw new Error('User or password is incorrect');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(! isPasswordCorrect) {
        throw new Error('User or password is incorrect');
    }
    return user;
}

const getPatient = async (email: string, password: string) => {
    const user = await Patient.findOne({ email }).select({ _id: 1, password: 1 }).lean(); 
    if(! user) {
        throw new Error('User or password is incorrect');
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(! isPasswordCorrect) {
        throw new Error('User or password is incorrect');
    }
    return user;   
}
