import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { authenticatePatientOrAdmin } from "../../services/auth";

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if(! email || ! password) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Email and password are required' });
    }
    try {
        const { accessToken, refreshToken } = await authenticatePatientOrAdmin(email, password);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });
        res.status(StatusCodes.OK).json(accessToken);   
    } catch(error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}